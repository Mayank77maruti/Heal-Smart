import React, { useState } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import SymptomAnalysis from '../SymptomAnalysis/SymptomAnalysis';
import MentalWellness from '../MentalWellness/MentalWellness';
import ConsultDoctor from '../ConsultDoctor/ConsultDoctor';
import hero from '../../img/hero.png'

function Home({ updateActive }) {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "SymptomAnalysis":
        updateActive(2);
        return;
      case "MentalWellness":
        updateActive(3);
        return;
      case "ConsultDoctor":
        updateActive(4);
        return;
      default:
        updateActive(1);
        return;
    }
  };

  return (
    <HomeStyled>
      {/* <InnerLayout> */}
      {!selectedComponent ? (
        <>
        <HeroSection>
          <div className='hero'>
            <div className='des'>
            <h3>Heal Smart:</h3>
            <h1>Take Charge of Your Health, Mind & Body</h1>
            <p>Feeling under the weather and not sure what's wrong? Don't worry, HealSmart is here to be your friendly health detective!</p>
            </div>
            <div className='des'>
              <img src={hero} alt=''></img>
            </div>
          </div>
        </HeroSection>
        <CardContainer>
          <Card onClick={() => handleComponentClick('SymptomAnalysis')}>
            <h2>Symptom Analysis</h2>
            <br/>
            <p>Analyze your symptoms and get assistance powered by AI</p>
          </Card>
          <Card onClick={() => handleComponentClick('MentalWellness')}>
            <h2>Mind-Bot</h2>
            <br/>
            <p>Your AI Companion for Mental Wellness and guidance</p>
          </Card>
          <Card onClick={() => handleComponentClick('ConsultDoctor')}>
            <h2>Consult Doctor</h2>
            <br/>
            <p>Explore specialists and book appointments hassle-free</p>
          </Card>
        </CardContainer>
        </>
      ) : (
        renderSelectedComponent()
      )}
      {/* </InnerLayout> */}
    </HomeStyled>
  );
}

const HomeStyled = styled.div`
  /* Your styles for the overall home page layout */
`;

const HeroSection = styled.div`
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: purple;
  text-align: center;

  .hero{
    height: 300px;
    /* margin-top: 400px; */
    margin: 50px 80px;
    display: flex;
    justify-content: space-between;
    
  }
  .des{
    flex: 1;
    margin-right: 20px;
    margin-top: 50px;
  }

  .des h3{
    /* margin-right: 300px; */
      font-size: 30px;
      font-weight:700;
      color: darkviolet;
  }

  .des h1{
    align-items: start;
    font-weight: 700;
    font-size: 40px;
    color: darkviolet;
  }

  .des p{
    align-items: start;
    color: #222260;
    font-weight: 500;
    /* margin-right: -40px; */
  }


  .des img{
    width: 320px;
    margin-left: 110px;
    margin-top: -45px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 120px 50px;
  cursor: hover;
`;

const Card = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: calc(33.33% - 20px);
  transition: all 0.3s ease;
  color: #4b0082;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    color: darkViolet;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h2 {
    font-weight: 700;
    margin-bottom: 10px;
  }

  p {
    font-size: 17px;
    color: #666;
  }
`;

export default Home;
