import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(['Learn React', 'Build awesome apps', 'Deploy to production']);
  const [newTodo, setNewTodo] = useState('');
  const [theme, setTheme] = useState('purple');

  const themes = {
    purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    sunset: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)',
    ocean: 'linear-gradient(135deg, #4169E1 0%, #1E90FF 50%, #87CEEB 100%)',
    nature: 'linear-gradient(135deg, #2E8B57 0%, #3CB371 50%, #90EE90 100%)',
    pink: 'linear-gradient(135deg, #EC4899 0%, #F472B6 50%, #FBBF24 100%)'
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo.trim()]);
      setNewTodo('');
    }
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '30px',
    margin: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
  };

  const buttonStyle = {
    padding: '12px 24px',
    margin: '8px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  };

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: themes[theme],
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    }
  }, [
    // Header
    React.createElement('div', {
      key: 'header',
      style: { textAlign: 'center', marginBottom: '40px' }
    }, [
      React.createElement('h1', {
        key: 'title',
        style: { fontSize: '3rem', margin: '0 0 20px 0', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }
      }, '🚀 React Dashboard Pro'),
      React.createElement('p', {
        key: 'subtitle',
        style: { fontSize: '1.2rem', opacity: 0.9 }
      }, 'A beautiful, interactive React application')
    ]),

    // Theme Selector
    React.createElement('div', {
      key: 'theme-selector',
      style: { ...cardStyle, textAlign: 'center', maxWidth: '600px', margin: '0 auto 30px auto' }
    }, [
      React.createElement('h3', { key: 'theme-title' }, '🎨 Choose Theme'),
      React.createElement('div', {
        key: 'theme-buttons',
        style: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }
      }, Object.keys(themes).map(themeName => 
        React.createElement('button', {
          key: themeName,
          onClick: () => setTheme(themeName),
          style: {
            ...buttonStyle,
            background: theme === themeName ? 'white' : 'rgba(255,255,255,0.2)',
            color: theme === themeName ? '#333' : 'white',
            border: theme === themeName ? 'none' : '2px solid rgba(255,255,255,0.3)'
          }
        }, themeName.charAt(0).toUpperCase() + themeName.slice(1))
      ))
    ]),

    // Main Content Grid
    React.createElement('div', {
      key: 'main-grid',
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }
    }, [
      // Counter Card
      React.createElement('div', {
        key: 'counter-card',
        style: cardStyle
      }, [
        React.createElement('h3', {
          key: 'counter-title',
          style: { textAlign: 'center', marginBottom: '20px' }
        }, '🔢 Interactive Counter'),
        React.createElement('div', {
          key: 'counter-display',
          style: {
            textAlign: 'center',
            fontSize: '4rem',
            fontWeight: 'bold',
            margin: '30px 0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }
        }, count),
        React.createElement('div', {
          key: 'counter-buttons',
          style: { textAlign: 'center' }
        }, [
          React.createElement('button', {
            key: 'increment',
            onClick: () => setCount(count + 1),
            style: {
              ...buttonStyle,
              background: '#4CAF50',
              color: 'white'
            }
          }, '+ Increment'),
          React.createElement('button', {
            key: 'decrement',
            onClick: () => setCount(count - 1),
            style: {
              ...buttonStyle,
              background: '#f44336',
              color: 'white'
            }
          }, '- Decrement'),
          React.createElement('button', {
            key: 'reset',
            onClick: () => setCount(0),
            style: {
              ...buttonStyle,
              background: 'transparent',
              color: 'white',
              border: '2px solid white'
            }
          }, '🔄 Reset')
        ])
      ]),

      // Todo List Card
      React.createElement('div', {
        key: 'todo-card',
        style: cardStyle
      }, [
        React.createElement('h3', {
          key: 'todo-title',
          style: { textAlign: 'center', marginBottom: '20px' }
        }, '📝 Todo List'),
        React.createElement('div', {
          key: 'todo-input',
          style: { display: 'flex', marginBottom: '20px' }
        }, [
          React.createElement('input', {
            key: 'todo-field',
            type: 'text',
            value: newTodo,
            onChange: (e) => setNewTodo(e.target.value),
            onKeyPress: (e) => e.key === 'Enter' && addTodo(),
            placeholder: 'Add a new task...',
            style: {
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '16px',
              marginRight: '10px'
            }
          }),
          React.createElement('button', {
            key: 'add-button',
            onClick: addTodo,
            style: {
              ...buttonStyle,
              background: '#2196F3',
              color: 'white',
              margin: 0
            }
          }, 'Add')
        ]),
        React.createElement('div', {
          key: 'todo-list'
        }, todos.map((todo, index) => 
          React.createElement('div', {
            key: index,
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.1)',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '10px'
            }
          }, [
            React.createElement('span', { key: 'todo-text' }, todo),
            React.createElement('button', {
              key: 'remove-button',
              onClick: () => removeTodo(index),
              style: {
                background: '#ff4757',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer'
              }
            }, '×')
          ])
        ))
      ]),

      // Stats Card
      React.createElement('div', {
        key: 'stats-card',
        style: cardStyle
      }, [
        React.createElement('h3', {
          key: 'stats-title',
          style: { textAlign: 'center', marginBottom: '20px' }
        }, '📊 App Statistics'),
        React.createElement('div', {
          key: 'stats-grid',
          style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'center' }
        }, [
          React.createElement('div', { key: 'counter-stat' }, [
            React.createElement('div', {
              key: 'counter-num',
              style: { fontSize: '2rem', fontWeight: 'bold' }
            }, count),
            React.createElement('div', { key: 'counter-label' }, 'Counter Value')
          ]),
          React.createElement('div', { key: 'todos-stat' }, [
            React.createElement('div', {
              key: 'todos-num',
              style: { fontSize: '2rem', fontWeight: 'bold' }
            }, todos.length),
            React.createElement('div', { key: 'todos-label' }, 'Total Todos')
          ]),
          React.createElement('div', { key: 'theme-stat' }, [
            React.createElement('div', {
              key: 'theme-name',
              style: { fontSize: '1.5rem', fontWeight: 'bold' }
            }, theme.charAt(0).toUpperCase() + theme.slice(1)),
            React.createElement('div', { key: 'theme-label' }, 'Current Theme')
          ]),
          React.createElement('div', { key: 'status-stat' }, [
            React.createElement('div', {
              key: 'status-icon',
              style: { fontSize: '2rem' }
            }, '✅'),
            React.createElement('div', { key: 'status-label' }, 'App Status')
          ])
        ])
      ])
    ]),

    // Footer
    React.createElement('div', {
      key: 'footer',
      style: {
        textAlign: 'center',
        marginTop: '50px',
        opacity: 0.8,
        fontSize: '14px'
      }
    }, '© 2025 React Dashboard Pro - Built with ❤️ and React')
  ]);
}