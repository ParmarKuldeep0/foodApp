import React from 'react';
import { foodMenu } from '../utils/MenuList';
import { particularFoodData } from '../utils/particularFoodInfo';
import { useDispatch, useSelector } from 'react-redux';
import { addTheFood , removeTheFood} from '../REDUX/redux';

import '../App.css';
function Homepage() {
    const [menuItemName, setMenuItemName] = React.useState('');
    const dispatch = useDispatch();
    const cart = useSelector(state => state.food.items);

    function menuImageClick(receivedMenuItemName) {
        setMenuItemName(receivedMenuItemName);
    }

    const filteredFoodData = particularFoodData.filter(i =>
        i.foodName.toLowerCase().includes(menuItemName.toLowerCase())
    );

    function increaseQuantity(selected) {
        dispatch(addTheFood(selected));
    }

    function decreaseQuantiny(selected) {
        dispatch(removeTheFood(selected.foodId));
    }
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="flex justify-evenly items-center mb-8">
                    {foodMenu.map((item) => (
                        <div key={item.menuItemName} className="menu-item flex flex-col items-center justify-center p-2">
                            <img
                                src={item.menuItemImage}
                                alt={item.menuItemName}
                                className={`w-20 h-20 rounded-full cursor-pointer border-4 ${menuItemName === item.menuItemName ? 'border-red-500' : 'border-transparent'}`}
                                onClick={() => menuImageClick(item.menuItemName)}
                            />
                            <h2  className='menuname'>{item.menuItemName}</h2>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
                    {filteredFoodData.map((food) => (
                        <div key={food.foodId} className="group bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                            <div className="w-full h-48 bg-gray-200">
                                <img src={food.foodImageUrl} alt={food.foodName} className="h-full w-full object-cover object-center group-hover:opacity-75" />
                            </div>
                            <div className="p-2 flex flex-col flex-grow">
                                <h3 className="text-sm font-semibold text-gray-700">{food.foodName}</h3>
                                <p className="mt-1 text-xs text-gray-500">{food.foodDescription}</p>
                                <p className="mt-2 text-lg font-medium text-gray-900">₹{food.foodPrice}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center space-x-1">
                                        <button className="quantity-control" onClick={() => increaseQuantity(food)}>
                                            <img src="https://cdn.pixabay.com/photo/2014/04/02/10/55/plus-304947_1280.png" alt="Increase quantity" className="w-6 h-6 p-1 rounded-full bg-green-100 hover:bg-green-200 cursor-pointer" />
                                        </button>
                                        <span className="text-lg font-semibold">{cart.find(item => item.foodId === food.foodId)?.quantity || 0}</span>
                                        <button className="quantity-control" onClick={() => decreaseQuantiny(food)}>
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlJi7uacHxRVpYC4ap3wGZCz9XT91OQRz3tg&s" alt="Decrease quantity" className="w-6 h-6 p-1 rounded-full bg-red-100 hover:bg-red-200 cursor-pointer" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
export default Homepage;