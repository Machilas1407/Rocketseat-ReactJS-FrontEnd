import React, { useState, useEffect } from 'react'
import api from './services/api';

import './App.css';

import Hearder from './components/Header';

/**
 * Os três conceitos mais importantes :
 * Componentes
 * Propiedade
 * Estado & Imutabilidade
 */

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects')
            .then(response => {
                console.log(response)
                setProjects(response.data)
            })
    }, []);

    // useState retorna um array com 2 posições
    //
    // 1. Variável com o seu valor inicial
    // 2.  Função para atualizarmos esse valor


    async function handleAddproject() {
        // projects.push(`Novo Projeto ${Date.now()}`);
        // setProjects([...projects, `Novo Projeto ${Date.now()}`]);

        const response = await api.post('projects',
            {
                title: `Novo Projeto ${Date.now()}`,
                owner: "Marcello Máchilas"
            });

        const project = response.data

        setProjects([...projects, project])
    }

    return (
        <>
            <Hearder title="Projects" />


            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type='button' onClick={handleAddproject}>Adicionar Projeto</button>

        </>
    )
}

export default App;