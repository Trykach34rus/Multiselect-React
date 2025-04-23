// Интерфейс для описания опции в мультивыборе
export interface Option {
	label: string // Метка опции, которая будет отображаться пользователю
	value: string // Значение опции, которое будет использоваться для идентификации выбора
}
// Интерфейс для описания пропсов компонента Multiselect
export interface MultiselectProps {
	option: Option[] // Массив доступных опций для выбора
	selectedOptions: string[] // Массив текущих выбранных опций (значения)
	onSelectChange: (selected: string[]) => void // Функция обратного вызова для обновления выбранных опций
	placeholder?: string // Необязательный текст-заполнитель для поля поиска
}
