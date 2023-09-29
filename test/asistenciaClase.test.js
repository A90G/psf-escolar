
const trackerAsistenciaXAlumno = require("./asistenciaClase");

test ("tracker de asistencia por alumno", () => {
    expect(trackerAsistenciaXAlumno(0,1)).toBe (1);
  })