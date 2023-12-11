export const dias= [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sabado",
    ];

export const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octobre",
    "Noviembre",
    "Diciembre",
    ];

export const semanas = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    ];


export const getSemanaPorFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = date.getDay();
    return semanas[dia];
}

export const getMesPorFecha = (fecha) => {
    const date = new Date(fecha);
    const mes = date.getMonth();
    return meses[mes];
}

export const getDiaSemanaPorFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = date.getDay();
    return diasSemana[dia];
}

// Función para extraer los años
export function getAnios(jsonData) {
    const yearsSet = new Set();
    jsonData.forEach(item => {
      const year = new Date(item.date).getFullYear();
      yearsSet.add(year);
    });
    return Array.from(yearsSet);
  }
