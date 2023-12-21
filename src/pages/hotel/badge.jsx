import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import PoolIcon from '@mui/icons-material/Pool';
import Card from '@mui/material/Card';
import { ClassNames } from '@emotion/react';
import './badge.css'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AcUnitIcon from '@mui/icons-material/AcUnit';
export default function Badges() {
  return (
    <div ClassNames="badge">
    <IconButton aria-label="cart">
        <ApartmentIcon />
        <d>Apartment</d>
    </IconButton>
  
    <IconButton aria-label="cart">
 
    <FilterVintageIcon />
    <d>Garden</d>
</IconButton>

<IconButton aria-label="cart">
 
    <PoolIcon />
    <d>Pool Swimming</d>
</IconButton>
<IconButton aria-label="cart">
 
    <RssFeedIcon />
    <d>Free Wi-fi</d>
</IconButton>
<IconButton aria-label="cart">
 
    <AcUnitIcon />
    <d>Air Conditional</d>
</IconButton>
</div>
  );
}