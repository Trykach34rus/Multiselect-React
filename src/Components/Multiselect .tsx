import { useState } from 'react' // Импортируем хук useState из библиотеки React
import close from '../SvgProgect/close.svg' // Импортируем иконку для кнопки очистки
import keyboard from '../SvgProgect/keyboard.svg' // Импортируем иконку для кнопки открытия выпадающего списка
import { MultiselectProps } from '../type.ts' // Импортируем типы пропсов для компонента
import './Multiselect.css' // Импортируем стили для компонента
// Основной компонент Multiselect
export default function Multiselect({
	options, // Доступные опции для выбора
	selectedOptions, // Текущие выбранные опции
	onSelectChange, // Функция для обновления выбранных опций
	placeholder, // Заполнитель для выпадающего списка
}: MultiselectProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false) // Состояние для управления открытием выпадающего списка
	const [searchTerm, setSearchTerm] = useState<string>('') // Состояние для хранения текста поиска
	// Функция для обработки выбора опции
	function handleSelect(value: string): void {
		const isSelected = selectedOptions.includes(value) // Проверяем, выбрана ли опция
		const newSelectedOptions = isSelected
			? selectedOptions.filter(option => option !== value) // Если выбрана, удаляем из выбранных
			: [...selectedOptions, value] // Если не выбрана, добавляем в выбранные
		onSelectChange(newSelectedOptions) // Вызываем функцию для обновления выбранных опций
	}
	// Функция для очистки всех выбранных опций
	function handleClearAll(): void {
		onSelectChange([]) // Вызываем функцию с пустым массивом, чтобы сбросить выбор
	}
	// Фильтрация опций на основе текста поиска
	const filteredOptions = options.filter(
		opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()) // Проверяем, содержится ли текст поиска в метке опции
	)
	return (
		<div className='multiselect'>
			{' '}
			{/* Основной контейнер для компонента */}
			<div className='selected-options'>
				{' '}
				{/* Контейнер для выбранных опций */}
				{selectedOptions.map(value => {
					// Проходим по всем выбранным опциям
					const currentOption = options.find(opt => opt.value === value) // Находим текущую опцию по значению
					return (
						<div key={value} className='selected-item'>
							{' '}
							{/* Контейнер для отдельной выбранной опции */}
							{currentOption?.label} {/* Отображаем метку текущей опции */}
							<button
								onClick={() => handleSelect(value)} // Обработчик нажатия для удаления опции
								className='remove-button' // Класс для стилей кнопки удаления
							>
								× {/* Символ для удаления */}
							</button>
						</div>
					)
				})}
				<div className='buttons-container'>
					{' '}
					{/* Контейнер для кнопок очистки и открытия списка */}
					<button onClick={handleClearAll} className='clear-button'>
						{' '}
						{/* Кнопка для очистки всех выбранных опций */}
						<img src={close} alt='Очистить все' />{' '}
						{/* Изображение кнопки очистки */}
					</button>
					<span className='separator'>|</span>{' '}
					{/* Разделитель между кнопками */}
					<button
						className='dropdown-toggle' // Класс для стилей кнопки открытия списка
						onClick={() => setIsOpen(prev => !prev)} // Обработчик нажатия для переключения состояния открытия
					>
						<img src={keyboard} alt='' />{' '}
						{/* Изображение кнопки открытия списка */}
					</button>
				</div>
			</div>
			{isOpen && ( // Если выпадающий список открыт
				<div className='dropdown'>
					{' '}
					{/* Контейнер для выпадающего списка */}
					<input
						type='text' // Поле ввода для текста поиска
						className='search-input' // Класс для стилей поля ввода
						placeholder={placeholder} // Заполнитель для поля ввода
						value={searchTerm} // Текущее значение текста поиска
						onChange={e => setSearchTerm(e.target.value)} // Обработчик изменения текста поиска
					/>
					{filteredOptions.length === 0 ? ( // Если нет доступных опций
						<div className='no-options'>Нет доступных опций</div> // Сообщение о том, что опции недоступны
					) : (
						filteredOptions.map(
							(
								opt // Если есть доступные опции
							) => (
								<div
									key={opt.value} // Уникальный ключ для каждой опции
									className={`option ${
										// Класс для стилей опции
										selectedOptions.includes(opt.value) ? 'selected' : '' // Если опция выбрана, добавляем класс 'selected'
									}`}
									onClick={() => handleSelect(opt.value)} // Обработчик нажатия для выбора опции
								>
									{selectedOptions.includes(opt.value) ? '✔️' : '⬜'}{' '}
									{/* Отображаем символ выбора в зависимости от состояния */}
									{opt.label} {/* Отображаем метку опции */}
								</div>
							)
						)
					)}
				</div>
			)}
		</div>
	)
}
