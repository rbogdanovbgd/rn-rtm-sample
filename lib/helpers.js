import { Dimensions, Platform, PixelRatio } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

import moment from 'moment';
import localization from 'moment/locale/es';
import isString from 'lodash/isString';
//const Entities = require('html-entities').AllHtmlEntities;
//const entities = new Entities();

// based on iPhone 8's scale
const wscale = SCREEN_WIDTH / 414;
const hscale = SCREEN_HEIGHT / 896;

export function dateHourFormat(date) {
  return moment(date).locale('es', localization).format('DD MMM YYYY [a las] hh:mm A');
}

export function dateFormat(date) {
  return moment(date).locale('es', localization).format('DD MMM YYYY');
}

export function timeFormat(date) {
  return moment(date).locale('es', localization).format('hh:mm A');
}

export function amountFormat(amount) {
  return Number(amount.match(/\d|\./g).join(''));
}

export function normalizeFile(uri, type, name) {
  const file = {
    uri,
    type,
    name,
  };
  return file;
}

/*export function removeHtml(html) {
  return entities.decode(
    html
      ?.replace('\\', '')
      .replace(/(<([^>]+)>)/gim, '')
      .trim(),
  );
}*/

/*export function removeLinks(html) {
  return entities.decode(
    html
      ?.replace('\\', '')
      .replace(/<a[^>]*href=(["'])([^"']*)\1[^>]*>(.*?)<\/a>/gim, '$3 ($2)')
      .trim(),
  );
}*/

/*export function decodeEntities(text) {
  if (isString(text)) {
    return entities.decode(text);
  }
  return text;
}*/

export function normalizeSize(size, based) {
  const newSize = based === 'height' ? size * hscale : size * wscale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export function calculatePayment(monto) {
  let comisionFija = 2.5;
  let factorImpuesto = 0.16;
  let factorComision = 0.029;
  let total = monto + comisionFija * (1 + factorImpuesto);

  total = total / (1 - (1 + factorImpuesto) * factorComision);
  total = total.toFixed(2);

  let comisionProporcional = (factorComision * Number(total)).toFixed(4);
  let comisionTotal = (comisionFija + Number(comisionProporcional)).toFixed(4);
  let ivaComision = Number(comisionTotal) * factorImpuesto;

  return {
    total,
    comisionProporcional,
    comisionFija: comisionFija.toFixed(4),
    comisionTotal: (comisionFija + Number(comisionProporcional)).toFixed(4),
    ivaComision: ivaComision.toFixed(4),
    params: { factorComision, factorImpuesto, comisionFija, monto },
  };
}
