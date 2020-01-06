import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';

const reload = () => window.location.reload();

function Result(props) {
    let div;
    const style = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'rgb(0, 113, 206)',
        padding: '24px',
        color: 'white',
        alignItems: 'center',
    };
    if (props.quizResult === 'lost') {
        div = (
            <div style={style}>
                <h2>You failed the quizz...</h2>
                <button
                    style={{
                        background: '#cfde00',
                        border: 'none',
                        color: '#0071ce',
                        padding: '15px 32px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '1.5em',
                        fontFamily: 'PT Sans, sans-serif',
                        borderRadius: '4px'
                    }}
                    onClick={reload}> Try again
                </button>
            </div>
        )
    }
    if (props.quizResult === 'win') {
        div = <Form  {...props} />
    }
    return (
        <>
            {div}
        </>
    );
}

Result.propTypes = {
    quizResult: PropTypes.string.isRequired
};

export default Result;
