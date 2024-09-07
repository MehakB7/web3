import React from 'react'

import { CoffeeIcon } from './Coffee';
import { Counter } from './Counter';
import { CoffeeFactory } from './CoffeeFactory';
import { Fundme } from './Fundme';

export type IconName=  "coffee" | "counter"|"coffeeFactory"|"fundMe";

const icons = {
    coffee: CoffeeIcon,
    counter: Counter,
    coffeeFactory: CoffeeFactory,
    fundMe: Fundme
}


export const Icon = ({name, className}: {name :IconName, className:string}) => {
    const Component = icons[name];
    return <Component className={className} />;
}