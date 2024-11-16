import React, { useState } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

// Global Styles for Dark and Light Mode
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => (theme === 'dark' ? '#1e1e1e' : '#f9f9f9')};
    color: ${({ theme }) => (theme === 'dark' ? '#e0e0e0' : '#333')};
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    transition: background-color 0.3s, color 0.3s;
  }
`;

// Spinner Animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Container Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  position: relative;
`;

// Title Styles
const Jokeh1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => (theme === 'dark' ? '#ffdd59' : '#ff6f00')};
  text-shadow: 0px 4px 8px rgba(255, 221, 89, 0.7);
  transition: color 0.3s;
`;

// Joke Output Box
const Output = styled.div`
  font-size: 1.5rem;
  background-color: ${({ theme }) => (theme === 'dark' ? '#333' : '#ffffff')};
  color: ${({ theme }) => (theme === 'dark' ? '#fffae5' : '#444')};
  padding: 1.5rem;
  margin: 1rem;
  border-radius: 10px;
  max-width: 80%;
  text-align: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.4);
  transition: background-color 0.3s, color 0.3s;
`;

// Button Styles
const Button = styled.button`
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ theme }) => (theme === 'dark' ? '#ff793f' : '#ff6f00')};
  color: #fff;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#ff5252' : '#ff8a00')};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

// Category Selection Styles
const CategorySelect = styled.select`
  font-size: 1rem;
  padding: 0.5rem;
  margin: 1rem;
  background-color: ${({ theme }) => (theme === 'dark' ? '#444' : '#f1f1f1')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#333')};
  border-radius: 5px;
  border: none;
  transition: background-color 0.3s, color 0.3s;
`;

// Toggle Button for Dark/Light Mode
const ToggleButton = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => (theme === 'dark' ? '#444' : '#f1f1f1')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#333')};
  border: none;
  border-radius: 5px;
  margin-top: 1rem;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: background-color 0.3s, color 0.3s;
`;

// Reaction Buttons
const ReactionButton = styled.button`
  font-size: 1.5rem;
  background-color: ${({ theme }) => (theme === 'dark' ? '#444' : '#f0f0f0')};
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#333')};
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#ff793f' : '#ff6f00')};
  }
`;

// Spinner Styles
const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ff793f;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
`;

const Joke = () => {
  const [joke, setJoke] = useState('');
  const [category, setCategory] = useState('Programming');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [reaction, setReaction] = useState({ like: 0, dislike: 0 });

  const handleBtn = () => {
    setLoading(true);
    fetch(`https://v2.jokeapi.dev/joke/${category}?type=single`)
      .then((res) => res.json())
      .then((data) => {
        setJoke(data.joke);
        setLoading(false);
      })
      .catch(() => {
        setJoke('Oops! Something went wrong.');
        setLoading(false);
      });
  };

  const handleReaction = (type) => {
    setReaction((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <GlobalStyle theme={theme} />
      <Container>
        <ToggleButton onClick={toggleTheme}>
          Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </ToggleButton>
        <Jokeh1 theme={theme}>Programming Joke Generator</Jokeh1>
        <CategorySelect onChange={(e) => setCategory(e.target.value)} value={category} theme={theme}>
          <option value="Programming">Programming</option>
          <option value="Miscellaneous">Miscellaneous</option>
          <option value="Pun">Pun</option>
          <option value="Spooky">Spooky</option>
        </CategorySelect>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Output theme={theme}>{joke || 'Click the button to get a joke!'}</Output>
            <div>
              <Button onClick={handleBtn} theme={theme}>Get Joke</Button>
              <div>
                <ReactionButton onClick={() => handleReaction('like')} theme={theme}>👍 {reaction.like}</ReactionButton>
                <ReactionButton onClick={() => handleReaction('dislike')} theme={theme}>👎 {reaction.dislike}</ReactionButton>
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Joke;
