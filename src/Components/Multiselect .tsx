import { useState } from 'react'
import { MultiselectProps } from '../type.ts'
import './Multiselect.css'
// Определяем компонент Multiselect, принимающий пропсы
export default function Multiselect({
	option, // Доступные опции для выбора
	selectedOptions, // Текущие выбранные опции
	onSelectChange, // Функция для обновления выбранных опций
	placeholder = 'Поиск', // Заполнитель для поля ввода
}: MultiselectProps) {
	// Состояние для хранения термина поиска
	const [searchTerm, setSearchTerm] = useState<string>('')
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
	// Фильтруем доступные опции по термину поиска
	const filteredOptions = option.filter(
		option => option.label.toLowerCase().includes(searchTerm.toLowerCase()) // Сравниваем с терминами в нижнем регистре
	)
	return (
		<div className='multiselect'>
			{/* Основной контейнер компонента */}
			<div className='selected-options'>
				{/* Контейнер для выбранных опций */}
				{selectedOptions.map(value => {
					const currentOption = option.find(opt => opt.value === value) // Находим текущую опцию по значению
					return (
						<span key={value} className='selected-option'>
							{/* Отображаем выбранную опцию */}
							{currentOption?.label} {/* Показываем метку опции */}
							<button onClick={() => handleSelect(value)}>×</button>{' '}
							{/* Кнопка для удаления опции */}
						</span>
					)
				})}
				{selectedOptions.length > 0 && ( // Если есть выбранные опции, показываем кнопку для очистки
					<button onClick={handleClearAll}>Очистить все</button>
				)}
			</div>
			<input
				type='text' // Поле ввода для поиска
				placeholder={placeholder} // Заполнитель для поля ввода
				onChange={e => setSearchTerm(e.target.value)} // Обновляем состояние термина поиска при изменении
			/>
			<div className='dropdown'>
				-{/* Контейнер для выпадающего списка опций */}
				{filteredOptions.map(
					(
						option // Отображаем отфильтрованные опции
					) => (
						<div
							key={option.value} // Уникальный ключ для каждой опции
							className={`option ${
								// Класс для стилизации опции
								selectedOptions.includes(option.value) ? 'selected' : '' // Добавляем класс 'selected', если опция выбрана
							}`}
							onClick={() => handleSelect(option.value)} // Обрабатываем выбор опции
						>
							{option.label} {/* Показываем метку опции */}
						</div>
					)
				)}
			</div>
		</div>
	)
}
