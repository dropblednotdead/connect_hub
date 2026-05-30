import * as React from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
	AccordionSummaryProps,
	accordionSummaryClasses,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

// Здесь мы с помощью специальной функции styled задаём стили, которые будут у нашего
// меню "Аккордиона"
const Accordion = styled((props: AccordionProps) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
	borderTop: `1px solid black`,
	borderBottom: `1px solid black`,
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&::before': {
		display: 'none',
	},
}))

// Здесь мы задаём стили для заголовков в меню "Аккордион"
const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
		{...props}
	/>
))(({ theme }) => ({
	[`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
		transform: 'rotate(45deg)',
	},
	[`& .${accordionSummaryClasses.content}`]: {
		marginLeft: theme.spacing(1),
	},
	...theme.applyStyles('dark', {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
	}),
	padding: '10px 0px',
}))

// Здесь мы задаём стили для подробных описаний в меню "Аккордион"
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

export default function CustomizedAccordions() {
	// С помощью специальной функции useState из React мы создаём состояние с текущим открытым пунктом меню
	// и получаем функцию setExpanded для изменения этого состояния
	const [expanded, setExpanded] = React.useState<string | false>('panel1')

	// Создаём функцию, при которой, если мы нажимаем на крестик, то наше состояние становится false
	// и все пункты меню закрыты, иначе переназначаем значение и закрываем старый пункт, открыв новый
	const handleChange = (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false)
	}

	// Box это тоже аналог div, но который лучше подходит для адаптивности
	return (
		<Box sx={{ mt: 5 }}>
			<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
				<AccordionSummary expandIcon={<AddCircleOutlineOutlinedIcon sx={{ color: 'black' }} />}>
					<Typography component='span' sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
						ОТСЛЕЖИВАНИЕ СОСТОЯНИЯ ОПОР
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
						Мы проводим регулярные обследования опор линий электропередачи, чтобы выявить возможные
						проблемы и предотвратить аварийные ситуации. Наши специалисты используют современное
						оборудование и методы, которые позволяют получить точные и достоверные данные о
						состоянии опор.
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
				<AccordionSummary expandIcon={<AddCircleOutlineOutlinedIcon sx={{ color: 'black' }} />}>
					<Typography component='span' sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
						ПОИСК ОПТИМАЛЬНЫХ ОПОР
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
						Мы помогаем предприятиям и организациям выбрать наиболее подходящие опоры для их нужд.
						Мы учитываем все факторы, влияющие на выбор опор, включая технические характеристики,
						стоимость, доступность и другие параметры.
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
				<AccordionSummary expandIcon={<AddCircleOutlineOutlinedIcon sx={{ color: 'black' }} />}>
					<Typography component='span' sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
						УСТРАНЕНИЕ НЕЛЕГАЛЬНЫХ ПОДКЛЮЧЕНИЙ
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
						Мы боремся с нелегальными подключениями к опорам линий электропередачи, которые могут
						привести к авариям и перебоям в электроснабжении. Наши специалисты проводят рейды и
						проверки, выявляют нелегальные подключения и принимают меры по их устранению.
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
				<AccordionSummary expandIcon={<AddCircleOutlineOutlinedIcon sx={{ color: 'black' }} />}>
					<Typography sx={{ fontSize: { xs: '20px', lg: '18px' } }} component='span'>
						ОТПРАВКА ЗАЯВОК НА ПОДКЛЮЧЕНИЕ
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography sx={{ fontSize: { xs: '20px', lg: '18px' } }}>
						Мы помогаем предприятиям и организациям быстро и просто отправить заявку на подключение
						к опорам линий электропередачи. Мы предоставляем онлайн-форму для заполнения заявки,
						которая позволяет отправить её в один клик.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</Box>
	)
}
