import React from 'react'
import './games.css'
import GlobalStyles from '../../styled-components/GlobalStyles';
import Card from '../card/card';

export const Games = () => {
    //api fetch here
    const array = [
        {name:'Catherine: Fullbody',img:'https://m.media-amazon.com/images/I/815BAHe2-lL.jpg'},
        {name:'The killer is dead',img:'https://m.media-amazon.com/images/I/71MW+LprsjL._AC_UF1000,1000_QL80_.jpg'},
        {name:'The Legend of Zelda: Ocarina of time',img:'https://neverendingrealm.com/wp-content/uploads/2019/02/The-Legend-of-Zelda-Ocarina-of-Time-3D-Box-Art.jpg'},
        {name:'Castlevania: Symphony of the Night',img:'https://assets-prd.ignimgs.com/2021/12/14/castlevaniasymp-1639445441428.jpg'}
    ]

  return (
    <div className='container'>
        <GlobalStyles />
        <p className='exo-font'>        
        games
        </p>
        <div className='games-container'>
            {array.map(({name, img})=>{
            return <Card key={name} name={name} img={img}/>
            })}
        </div>
    </div>
  )
}
