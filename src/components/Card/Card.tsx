import React from 'react';

import Button from '../Button';
import Text from '../Text';

import styles from './Card.module.scss';
import timeIcon from './icons/recipe_time_icon.svg';

export type CardProps = {
  callories?: string;
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
}) => (
  <div className={`${styles.card} ${className || ''}`} onClick={onClick}>
    <img src={image} alt="card-image" className={styles.card__image} />

    <div className={styles.card__content}>
      <div className={styles.card__body} style={{ gap: 8 }}>
        {captionSlot && (
          <Text className="padding-bottom" tag="p" color="secondary" view="p-14">
            {captionSlot}
          </Text>
        )}
        {subtitle && (
          <div className={styles.card__time}>
            <img className={styles.time__icon} src={timeIcon} />
            <Text
              tag="p"
              data-testid="text"
              className={styles.card__subtitle}
              color="secondary"
              view="p-16"
            >
              {subtitle}
            </Text>
          </div>
        )}
        {title && (
          <Text
            tag="p"
            data-testid="text"
            className={`${styles.card__title} padding-bottom`}
            weight="bold"
            view="p-20"
            color="primary"
          >
            {title}
          </Text>
        )}
      </div>
      <div className={styles.card__button}>
        {contentSlot && (
          <Text tag="p" weight="normal" view="p-16" color="secondary">
            {contentSlot}
          </Text>
        )}
      </div>
      <div className={styles.card__footer}>
        <Text view="p-18" color="accent">
          {callories}
        </Text>
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Save
        </Button>
      </div>
    </div>
  </div>
);

export default Card;
