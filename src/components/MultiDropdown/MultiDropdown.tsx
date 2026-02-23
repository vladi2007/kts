import React, { useEffect, useRef, useState } from 'react';
import Input from '../Input';
import './MultiDropdown.css'
import Text from '../Text/Text'
import ArrowDownIcon from '../icons/ArrowDownIcon';
export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  getTitle,
  value,
  disabled,
  onChange,
  options,
  className,
  ...props
}) => {
  const isSelected = (option: Option) =>
    value.some((v) => v.key === option.key);
  const selectOption = (option: Option) => {
    if (disabled) return;
    if (isSelected(option)) return onChange(value.filter((v) => v.key != option.key));
    else return onChange([...value, option]);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const rootEl = useRef<HTMLDivElement>(null);
  const title = getTitle(value);
  const hasValue = value.length > 0;
  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(filter.toLowerCase())
  );
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootEl.current && !rootEl.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [rootEl]);

  return (
    <div style={{width:300, position:'relative'}} ref={rootEl} className={`${className}`}>
      <Input
        value={hasValue ? title : filter}
        disabled={disabled}
        placeholder={getTitle(value)}
        onChange={(v) => {
          getTitle(value);
          setFilter(v);
        }}
        onClick={() => {
          if (!disabled) setIsOpen(true);
        }}
         afterSlot={<ArrowDownIcon color="secondary" />}
        {...props}
      />
      {isOpen && !disabled && (
        <div className='options' style={{marginTop:8,  height:144, backgroundColor:'#FFFFFF', boxShadow:'0px 4px 10px 0px rgba(0, 0, 0, 0.25)'}}>
          {filteredOptions.map((option) => {
            const isSelected = value.some((v) => v.key === option.key);

            return (
              <div
                key={option.key}
                onClick={() => selectOption(option)}
              
                data-testid={`option-${option.key}`}
                className='option'
                style={{height:48, display:'flex', alignItems:'center', paddingLeft:'12px' ,width:'100%'}}
              >
                <Text view='p-16' weight='normal' color='primary'>{option.value}</Text>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
