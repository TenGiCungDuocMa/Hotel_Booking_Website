import React from 'react';
import styled, {keyframes} from 'styled-components';

const moveLetters = keyframes`
    0% {
        transform: translateX(-15vw);
        opacity: 0;
    }
    33.3%, 66% {
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        transform: translateX(15vw);
        opacity: 0;
    }
`;

const movingLine = keyframes`
    0% {
        opacity: 0;
        width: 0;
    }
    33.3%, 66% {
        opacity: 0.8;
        width: 100%;
    }
    85% {
        width: 0;
        left: initial;
        right: 0;
        opacity: 1;
    }
    100% {
        opacity: 0;
        width: 0;
    }
`;

const LoadingContainer = styled.div`
    padding: 0 32px;
    text-align: center;
    color: #fff;
    position: relative;
    background-image: radial-gradient(circle farthest-corner at 10% 20%, rgba(0, 152, 155, 1) 0.1%, rgba(0, 94, 120, 1) 94.2%);
    height: 100vh;
    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: #fff;
        bottom: 0;
        left: 0;
        border-radius: 10px;
        animation: ${movingLine} 2.4s infinite ease-in-out;
    }
`;

const LoadingText = styled.div`
    font-size: 5vw;
    line-height: 64px;
    letter-spacing: 10px;
    margin-bottom: 32px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
    width: 100%;
    top: 50%;
    bottom: 50%;
`;

const Letter = styled.span`
    animation: ${moveLetters} 2.4s infinite ease-in-out;
    display: inline-block;
    opacity: 0;
    text-shadow: 0 2px 10px rgba(46, 74, 81, 0.3);
    animation-delay: ${({index}) => index * 0.1}s;
`;


const Loading = () => {
    const letters = "LOADING".split('');

    return (
        <>
            <LoadingContainer>
                <LoadingText>
                    {letters.map((char, i) => (
                        <Letter key={i} index={i}>{char}</Letter>
                    ))}
                </LoadingText>
            </LoadingContainer>
        </>
    );
};

export default Loading;
