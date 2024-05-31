import React from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { menuItems } from '../../utils/menuItems'
// import { signout } from '../../utils/Icons'

function Navigation({active, setActive}) {
  return (
    <NavStyled>
        <div className="user-con">
            <img src={avatar} alt="loading" />
            <div className="text">
                <p>HealSmart</p>
            </div>
        </div>
        <ul className="menu-items">
            {menuItems.map((item) => {
                return <li 
                    key ={item.id}
                    onClick={() => setActive(item.id)}
                    className={active === item.id ? 'active': ''}
                >
                    {item.icon}
                    <span>{item.title}</span>
                </li>
            })}
        </ul>
        <div className="bottom-nav">
        </div>
    </NavStyled>
  )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 336px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            margin-right: -2px;
            width: 60px;
            height: 60px;
            border-radius: 40%;
            object-fit: cover;
            background: #fcf6f9;
            border: 0.3px solid #FFFFFF;
            padding: .15rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        p{
            color: darkViolet;
            font-weight: 900;
            font-size: 37px;
        }
    }
    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, .6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }
    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
`;

export default Navigation