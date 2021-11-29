import React, { useState } from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Formulario = ({ guardarGasto, guardarCrearGasto }) => {
	const [nombre, guardarNombre] = useState('');
	const [cantidad, guardarCantidad] = useState(0);
	const [error, setError] = useState(false);

	// Cuando el usuario agrega un gasto
	const agregarGastos = (e) => {
		e.preventDefault();
		console.log(nombre, cantidad);
		// Validar
		if (nombre.trim() === '' || cantidad < 1 || isNaN(cantidad)) {
			setError(true);
			return;
		}
		setError(false);

		// Construir el gasto
		const gasto = {
			nombre,
			cantidad,
			id: shortid.generate(),
		};

		// Pasar el gasto al componente principal
		guardarGasto(gasto);
		guardarCrearGasto(true);

		// Resetear el form
		guardarNombre('');
		guardarCantidad(0);
	};
	return (
		<form onSubmit={agregarGastos}>
			<h2>Agrega tus gastos aqui</h2>
			{error ? (
				<Error mensaje='Ambos campos son obligatorios o presupuesto incorrecto' />
			) : null}
			<div className='campo'>
				<label>Nombre Gastos</label>
				<input
					type='text'
					className='u-full-width'
					placeholder='Ej. Transporte'
					value={nombre}
					onChange={(e) => guardarNombre(e.target.value)}
				/>
			</div>
			<div className='campo'>
				<label>Cantidad Gastos</label>
				<input
					type='number'
					className='u-full-width'
					placeholder='Ej. 300'
					value={cantidad}
					onChange={(e) => guardarCantidad(parseInt(e.target.value))}
				/>
			</div>
			<input
				type='submit'
				className='button-primary u-full-width'
				value='Agregar Gasto'
			/>
		</form>
	);
};
Formulario.propTypes = {
	guardarGasto: PropTypes.func.isRequired,
	guardarCrearGasto: PropTypes.func.isRequired,
};
export default Formulario;
