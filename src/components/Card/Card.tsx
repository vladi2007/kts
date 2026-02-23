import React, { useState } from 'react';
import './Card.css';
import Text from '../Text/Text';
import timeIcon from 'assets/icons/recipe_time_icon.svg';
import Button from '../Button';
export type CardProps = {
  callories?:string;
  className?: string;

  image: string;

  captionSlot?: React.ReactNode;

  title: React.ReactNode;

  subtitle: React.ReactNode;

  contentSlot?: React.ReactNode;

  onClick?: React.MouseEventHandler;

  actionSlot?: React.ReactNode;
};
const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  callories,
  actionSlot,
}) => (
  <div className={`card ${className}`} onClick={onClick}>
    <img src={image} alt="card-image" className="card-image" />

    <div className="card-content">
      <div className="card-body" style={{ gap: 8 }}>
        {captionSlot && (
          <Text className="padding-bottom" tag="p" color="secondary" view="p-14">
            {captionSlot}
          </Text>
        )}
        {subtitle && (
          <div className="card_time">
            <img className="time_icon" src={timeIcon} /> 
        
            <Text
              tag="p"
              data-testid="text"
              className="card-subtitle "
              color="secondary"
              view="p-16"
            >
              {` ${subtitle}`}
            </Text>
          </div>
        )}
        {title && (
          <Text
            tag="p"
            data-testid="text"
            className="card-title padding-bottom"
            weight="bold"
            view="p-20"
            color="primary"
          >
            {title}
          </Text>
        )}
      </div>
      <div className="card-button">
        {contentSlot && (
          <Text tag="p" weight="normal" view="p-16" color="secondary">
            {contentSlot}
          </Text>
        )}
        
      </div>
         <div className='card-footer'>
        <Text view="p-18" color='accent'>
          {callories}
        </Text>
        <Button onClick={(e) => {
      e.stopPropagation(); 
    }}>
          Save
        </Button>
      </div>
    </div>
  </div>
);

export default Card;
