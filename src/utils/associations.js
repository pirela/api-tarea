module.exports = function (models) {

	const Tarea = models.tarea
	const Tiempo = models.tiempo

	Tiempo.belongsTo(Tarea, {
		as: 'tiempo',
		foreignKey: 'id'
	})

	Tarea.hasMany(Tiempo, {
		as: 'tiempo',
		foreignKey: 'id'
	})

}
