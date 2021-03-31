import React, { useState, useEffect } from 'react';
import ChartController from '../ChartController/ChartController';
import { connect } from 'react-redux';
import { getData } from '../../modules/actions'

const DataController = (props) => {
  const [data, setData] = useState([]);
  const [points, setPoints] = useState({});
  const [url, setUrl] = useState('');
  const [rendering, setRendering] = useState(false);
  const [getDataFn] = useState(() => props.getData);

  // делаем запрос на сервер и запускаем цикл в 1 минуту для проверки данных
  useEffect(() => {
    let interval;
    setRendering(false);
    if (props.url !== url) {
      setUrl(props.url)
    } else if (props.url === url && url !== ''  && props.error !== true) {
      getDataFn(url)
      interval = setInterval(() => {
        getDataFn(url)
      }, 60000)
    }
    // отключаем цикл запросов, если пришла ошибка или введен новый url
    if(props.error === true){
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    };

  }, [props.url, props.error, getDataFn, url]);

  // проверяем данные, пришедшие с сервера, 
  //если они отличается от уже хранящихся, вызываем расчеты точек графика и перерисовку
  useEffect(() => {
    if (data.length === 0 && props.dataFromJson.length !== 0) {
      setData(props.dataFromJson);

    } else if (data.length !== 0 && props.dataFromJson.length !== 0 && data.length !== props.dataFromJson.length) {
      setData(props.dataFromJson);

    } else if (data.length === props.dataFromJson.length) {

      let dataAsObj = data.reduce((acc, elem) => {
        acc[elem.x] = elem.value
        return acc
      }, {});

      let dataFromJsonAsObj = props.dataFromJson.reduce((acc, elem) => {
        acc[elem.x] = elem.value
        return acc
      }, {});;

      Object.keys(dataAsObj).forEach(key => {
        if (dataAsObj[key] !== dataFromJsonAsObj[key]) {
          setData(props.dataFromJson)
        }
      })
      setRendering(true)
    }
    
  }, [props.dataFromJson, data])

  // подготавливаем данные отрисовки
  useEffect(() => {

    if (data.length !== 0) {
      const nullCoordY = 25;
      const svgHeight = 300;
      const svgWidth = 700;
      const step = 25;
      const biasX1 = 0;
      const biasX2 = 50;
      const biasY1 = 5;
      const biasY2 = 25;


      let pointsOfAxisX = '';
      let pointsOfAxisY = '';
      let grafik = '';

      let MaxY = 0;
      let MinY = 0;
      let zeroAxis = 0;
      let x = 0;
      let y = 0;
      let indexCompresionX = 0;
      let indexCompresionY = 0;
      let MaximumOfAxisY = 0;
      let MinimumOfAxisY = 0;
      let signOfCalibrationMin = 1;
      let signOfCalibrationMax = 1;

      let axisX = [];
      let axisY = [];
      let dots = [];
      let verticalLines = [];
      let verticalPolygon = [];
      let promptPolygon = [];
      let pointsOfLegendX = [];
      let pointsOfLegendY = [];
      let legendY = [];

      data.forEach((elem) => {
        axisX.push(elem.x)
        axisY.push(elem.value)
      })

      // удаляем лишние эелементы с начала и конца 'start' / 'end'
      axisX.shift();
      axisX.pop();
      axisY.shift();
      axisY.pop();

      MaxY = Math.max(...axisY);
      MinY = Math.min(...axisY);

      // делаем клабировку для значений максимума и минимума
      // чтобы корректно сдвагать график

      if (MaxY <= 0) {
        signOfCalibrationMax = 1;
        signOfCalibrationMin = 0;
      } else if (MinY >= 0) {
        signOfCalibrationMax = 0;
        signOfCalibrationMin = 1;
      } else if (MinY <= 0 && MaxY >= 0) {
        signOfCalibrationMax = 1;
        signOfCalibrationMin = 1;
      }

      // расширяем диапазон значений для красивого отображения на графике
      MaximumOfAxisY = (Math.floor((Math.abs(MaxY) / step)) + signOfCalibrationMin) * step;
      MinimumOfAxisY = (Math.floor((Math.abs(MinY) / step)) + signOfCalibrationMax) * step;

      // возвращаем знак, так как выше считали значение по модулю
      MaximumOfAxisY = (MaxY >= 0) ? MaximumOfAxisY : MaximumOfAxisY * -1;
      MinimumOfAxisY = (MinY >= 0) ? MinimumOfAxisY : MinimumOfAxisY * -1;

      // индекс сжатия по осям
      indexCompresionX = svgWidth / Object.keys(data).length;
      indexCompresionY = svgHeight / (MaximumOfAxisY - MinimumOfAxisY);

      //Расчитываем координаты точек графика, и подсказок.

      axisY.forEach((elem, index) => {
        x = ((index) * indexCompresionX) + (step * 3);

        if (MaxY <= 0) {
          y = Math.abs(elem * indexCompresionY) + nullCoordY;

        } else if (MinY >= 0) {
          y = (svgHeight + nullCoordY) - elem * indexCompresionY;

        } else if (MinY <= 0 && MaxY >= 0) {
          y = ((svgHeight + nullCoordY) + (MinimumOfAxisY * indexCompresionY)) - (elem * indexCompresionY);
        }

        dots.push([x, y]);

        grafik += x + ',' + y + ' ';

        verticalLines.push(x + ',' + nullCoordY + ' ' + x + ',' + (svgHeight + nullCoordY));

        verticalPolygon.push((x - step) + ',' + nullCoordY + ' ' + (x - step) + ',' + (svgHeight + nullCoordY) + ' '
          + (x + step) + ',' + (svgHeight + nullCoordY) + ' ' + (x + step) + ',' + nullCoordY);

        promptPolygon.push((x + biasX1) + ',' + (y - biasY1) + ' ' + (x + biasX1) + ',' + (y - biasY2) + ' '
          + (x + biasX2) + ',' + (y - biasY2) + ' ' + (x + biasX2) + ',' + (y - biasY1));
      })

      // создаем координаты и описание для шакал X и Y
      pointsOfAxisY = 'M ' + (step * 2) + ' ' + nullCoordY + ' l ' + 0 + ' ' + svgHeight;
      pointsOfAxisX = 'M ' + (step * 2) + ' ' + (svgHeight + nullCoordY) + ' l ' + (svgWidth - step * 4) + ' ' + 0;

      // заполняем значения для шкалы Y и точки, так же координаты самой оси и засечки
      let i = 0;
      while (i <= ((MaximumOfAxisY - MinimumOfAxisY)) / step) {
        legendY.push(MinimumOfAxisY + step * i);
        pointsOfAxisY += ' M ' + (step * 2) + ' '
          + ((svgHeight + (MinimumOfAxisY * indexCompresionY)) - (legendY[i] * indexCompresionY) + nullCoordY)
          + ' l -10 0';
        pointsOfLegendY.push([0, ((svgHeight + (MinimumOfAxisY * indexCompresionY)) - (legendY[i] * indexCompresionY)) + nullCoordY + 5])
        i++;
      }

      // заполняем точки для шкалы X, значения у нас берутся из JSON, так же координаты самой оси и засечки
      i = 0;
      while (i <= Object.keys(data).length - 2) {
        pointsOfAxisX += ' M ' + ((step * 2) + (i * step * 2)) + ' '
          + (svgHeight + nullCoordY)
          + ' l 0 10';
        pointsOfLegendX.push([(step * 2) + 15 + (i * step * 2), svgHeight + nullCoordY * 2])
        i++;
      }

      // Определяем нулевую ось толкьо в том случае, если есть отрицательные и положительные значения

      if (MaxY <= 0) {
        zeroAxis = 'none'
      } else if (MinY >= 0) {
        zeroAxis = 'none'
      } else if (MinY <= 0 && MaxY >= 0) {
        zeroAxis = (step * 2) + ',' + ((svgHeight + nullCoordY)+ (MinimumOfAxisY * indexCompresionY)) + ' '
          + (svgWidth - step * 2) + ',' + ((svgHeight + nullCoordY) + (MinimumOfAxisY * indexCompresionY));
      }

      // заполняем объект с точками и значениями
      setPoints({
        pointsOfgrafik: grafik,
        dots: dots,
        zeroAxis: zeroAxis,
        verticalLines: verticalLines,
        verticalPolygon: verticalPolygon,
        textPrompt: { axisY: axisY },
        promptPolygon: promptPolygon,
        descriptionLines: {
          pointsOfAxisX: pointsOfAxisX,
          pointsOfAxisY: pointsOfAxisY,
          pointsOfLegendX: pointsOfLegendX,
          pointsOfLegendY: pointsOfLegendY,
          legendX: axisX,
          legendY: legendY
        }
      });
    }
  }, [data])

  // Хук проверяет обновление точек, 
  // если объект отличатеся от предыдущего,
  // делает рендер компонента ChartController.

  useEffect(() => {
    setRendering(true)
  }, [points])

  if (rendering) {
    return <ChartController points={points}/> 
  } else {
    return <div></div>
  }
  

}
export default connect(state => ({
  url: state.url,
  dataFromJson: state.data,
  error: state.error
}), { getData })(DataController)