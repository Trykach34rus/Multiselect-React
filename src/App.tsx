import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Multiselect from './Components/Multiselect .tsx'
import { Option } from './type.ts'

function App() {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]) // Состояние для хранения выбранных опций
	const [options, setOption] = useState<Option[]>([]) // Состояние для хранения доступных опций
	useEffect(() => {
		// Хук useEffect для выполнения побочных эффектов (в данном случае, для загрузки данных)
		async function fetchData() {
			// Асинхронная функция для получения данных
			try {
				const response = await axios.get(
					'https://timeapi.io/api/timezone/availabletimezones' // Выполняем GET-запрос к API для получения временных зон
				)
				const optionsData = response.data.map((timezone: string) => ({
					label: timezone, // Создаем объект с меткой временной зоны
					value: timezone, // И устанавливаем значение равным метке
				}))
				setOption(optionsData) // Обновляем состояние options с полученными данными
			} catch (error) {
				console.error('Ошибка в получении данных', error) // Обработка ошибок: выводим сообщение об ошибке в консоль
			}
		}
		fetchData() // Вызываем функцию для загрузки данных
	}, []) // Пустой массив зависимостей означает, что useEffect выполнится только один раз при монтировании компонента
	return (
		<div className='app'>
			{/* Основной контейнер приложения */}
			<Multiselect
				options={options} // Передаем доступные опции в компонент Multiselect
				selectedOptions={selectedOptions} // Передаем выбранные опции
				onSelectChange={setSelectedOptions} // Передаем функцию для обновления выбранных опций
				placeholder='Выберите временные зоны' // Устанавливаем текст-заполнитель для поля поиска
			/>
		</div>
	)
}
export default App
