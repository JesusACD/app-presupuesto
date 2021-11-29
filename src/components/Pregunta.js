import React, { Fragment, useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Pregunta = ({
	guardarPresupuesto,
	guardarRestante,
	actualizarPregunta,
}) => {
	/******************
	 * Definir el state
	 *****************/
	const [cantidad, guardarCantidad] = useState(0);
	const [error, setError] = useState(false);

	/*+***************************
    Funcion que lee el presupuesto
     *****************************/
	const definirPresupuesto = (e) => {
		guardarCantidad(parseInt(e.target.value));
	};

	/********************************
    Submit para definir el presupuesto
    *********************************/
	const agregarPresupuesto = (e) => {
		e.preventDefault();

		// Validar
		if (cantidad < 1 || isNaN(cantidad)) {
			setError(true);
			return;
		}

		// Si se pada la validación
		setError(false);
		guardarRestante(cantidad);
		guardarPresupuesto(cantidad);
		actualizarPregunta(false);
	};
	return (
		<Fragment>
			<h2>Coloca tu presupuesto</h2>
			{error ? <Error mensaje='El Presupuesto es incorrecto' /> : null}
			<form onSubmit={agregarPresupuesto}>
				<input
					type='number'
					className='u-full-width'
					placeholder='Coloca tu presupuesto'
					onChange={definirPresupuesto}
				/>
				<input
					type='submit'
					className='button-primary u-full-width'
					value='Definir presupuesto'
				/>
			</form>
		</Fragment>
	);
};

Pregunta.propTypes = {
	guardarPresupuesto: PropTypes.func.isRequired,
	guardarRestante: PropTypes.func.isRequired,
	actualizarPregunta: PropTypes.func.isRequired,
};
export default Pregunta;
