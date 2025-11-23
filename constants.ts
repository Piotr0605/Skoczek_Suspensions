
import { PricingCategory } from './types';

export const APP_NAME = "Skoczek Suspensions";
export const ADDRESS = "ul. Mickiewicza 39, 15-213 Białystok";
export const PHONE = "+48 85 744 49 92";
export const EMAIL = "serwis@skoczek-suspensions.pl";

export const REGULATION_POINTS = [
  "Akceptacja niniejszego regulaminu jest warunkiem koniecznym przyjęcia sprzętu do serwisu.",
  "Serwis zastrzega sobie prawo do weryfikacji i korekty zakresu prac po rozebraniu komponentu.",
  "W przypadku przekroczenia wstępnej wyceny o więcej niż 20%, Klient zostanie poinformowany telefonicznie przed podjęciem dalszych prac.",
  "Na wykonane usługi udzielamy 3-miesięcznej gwarancji rozruchowej (z wyłączeniem części eksploatacyjnych).",
  "Nieodebranie sprzętu w terminie 30 dni od powiadomienia o zakończeniu serwisu skutkuje naliczeniem opłaty magazynowej w wysokości 5 PLN za każdą dobę."
];

export const PRICING_DATA: PricingCategory[] = [
  {
    id: 'FRONT',
    title: 'Amortyzatory Przednie',
    brands: [
      {
        name: 'Rock Shox',
        rows: [
          { model: 'Tora, Paragon, XC', priceService: '250', priceFull: '780' },
          { model: 'Judy, Sektor, Recon', priceService: '250', priceFull: '850 / 900' },
          { model: '30', priceService: '250', priceFull: '850' },
          { model: 'Bluto, Reba', priceService: '260', priceFull: null },
          { model: 'SID Motion Control', priceService: '260', priceFull: null },
          { model: 'SID Charger / Race Day', priceService: '300', priceFull: null },
          { model: 'SID Brain', priceService: '380', priceFull: '670' },
          { model: 'Revelation, Yari, Lyrik, Pike, Boxxer MC/Charger', priceService: '250-300', priceFull: '560-690' },
          { model: 'RS-1 / Brain', priceService: '270 / 350', priceFull: '670' },
          { model: 'Serwis zerowy', priceService: '120-180', priceFull: null },
        ]
      },
      {
        name: 'FOX',
        rows: [
          { model: '32', priceService: '300', priceFull: '780' },
          { model: '34', priceService: '300', priceFull: '850' },
          { model: '36', priceService: '300-350', priceFull: '850' },
          { model: '38', priceService: '300', priceFull: '900' },
          { model: '40-49', priceService: '350', priceFull: '900' },
        ]
      },
      {
        name: 'Manitou',
        rows: [
          { model: 'R7, Minute, Markhor, M30, Magnum, Mastodone, Machete, Circus', priceService: '240', priceFull: null },
          { model: 'Mattoc, Travis, Dorado, Mezzer', priceService: '300', priceFull: null },
        ]
      },
      {
        name: 'DT Swiss',
        rows: [
          { model: 'Modele 32/35', priceService: '300', priceFull: null },
        ]
      },
      {
        name: 'SR Suntour',
        rows: [
          { model: 'Epicon, Epixon, XR, Raidon, Axon', priceService: '250', priceFull: null },
          { model: 'Aion, Auron, Durolux, Rux', priceService: '280', priceFull: null },
        ]
      },
      {
        name: 'Cannondale',
        rows: [
           { model: 'Z osobną gumową na ładzę', priceService: '450', priceFull: null },
           { model: 'Bez osłony gumowej / Ocho / Oliver', priceService: '500', priceFull: null },
           { model: 'Fatty', priceService: '350', priceFull: null },
        ]
      }
    ]
  },
  {
    id: 'REAR',
    title: 'Amortyzatory Tylne (Dampery)',
    brands: [
      {
        name: 'Rock Shox',
        rows: [
          { model: 'Kage, Vivid Coil/Air', priceService: '260 / 280 / 450', priceFull: null },
          { model: 'Super Deluxe Coil/Air', priceService: '280 / 320', priceFull: null },
          { model: 'Brain, Deluxe ReAktiv', priceService: '380 / 360', priceFull: null },
          { model: 'Monarch/Monarch+/Deluxe+', priceService: '300', priceFull: null },
          { model: 'Serwis zerowy', priceService: '120-180', priceFull: null },
        ]
      },
      {
        name: 'FOX',
        rows: [
          { model: 'Float DPS/CTD/X/2', priceService: '300', priceFull: '590' },
          { model: 'RC/RL/RP2/23/R/DHX', priceService: '300', priceFull: '590' },
          { model: 'Triad/DRCJ/Triad', priceService: '300', priceFull: '670' },
          { model: 'Van R/RC/DHX...', priceService: '300', priceFull: '560' },
          { model: 'Float X2/DPX2/DHX X2', priceService: '340', priceFull: '690' },
          { model: 'IsoStrut', priceService: '750', priceFull: null },
          { model: 'Brain', priceService: '380', priceFull: '670' },
          { model: 'Serwis zerowy', priceService: '120-180', priceFull: null },
        ]
      },
      {
        name: 'Manitou',
        rows: [
           { model: 'Swinger, McLeod, Radium, Mara, Swinger Coil, Revox/Metel', priceService: '250 / 300', priceFull: null }
        ]
      },
      {
        name: 'DT Swiss',
        rows: [
          { model: 'Equalizer', priceService: '350', priceFull: null }
        ]
      },
      {
        name: 'SR Suntour',
        rows: [
           { model: 'Wszystkie modele Air', priceService: '280', priceFull: null }
        ]
      }
    ]
  },
  {
    id: 'OTHER',
    title: 'Inne Usługi',
    services: [
      { name: 'Montaż i demontaż dampera do ramy', price: '50-100' },
      { name: 'Montaż/Demontaż amortyzatora w rowerze (zależnie od skomplikowania)', price: '60-100' },
      { name: 'Montaż i demontaż sztycy regulowanej (np. Reverb)', price: '30-100' }
    ]
  }
];
