// Función para llevar un registro de asistencias de un estudiante
function trackerAsistenciaXAlumno() {
  this.totalAsistencias = 0;

}

// Método para registrar la asistencia del estudiante a una clase
trackerAsistenciaXAlumno.prototype.asistenciaClase = function () {
  // Incrementa el contador de asistencias en 1
  this.totalAsistencias++;
};

module.exports = trackerAsistenciaXAlumno;
