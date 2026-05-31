import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, TextField, Snackbar, Alert } from '@mui/material'
import { useAppSelector } from '../../hooks/react-redux'
import { useSendSupportMessageMutation } from '../../api/authApi'
import planetSvg from '../../assets/planet.svg'
import leftPlanetPng from '../../assets/left_planet.png'
import rightPlanetPng from '../../assets/right_planet.png'
import Footer from '../../components/Main/Footer/Footer'

const applyPhoneMask = (value: string) => {
	let clean = value.replace(/\D/g, '')
	if (!clean) return ''
	if (clean[0] === '7' || clean[0] === '8') clean = clean.slice(1)
	let res = '+7'
	if (clean.length > 0) res += ` (${clean.substring(0, 3)}`
	if (clean.length >= 4) res += `) ${clean.substring(3, 6)}`
	if (clean.length >= 7) res += `-${clean.substring(6, 8)}`
	if (clean.length >= 9) res += `-${clean.substring(8, 10)}`
	return res
}

const SupportPage = () => {
	const userPhone = useAppSelector(state => state.userSlice.user?.user_info?.phone_num)
	const [phone, setPhone] = useState('')
	const [message, setMessage] = useState('')
	const [sendMessage] = useSendSupportMessageMutation()
    const [openSnack, setOpenSnack] = useState(false)

	useEffect(() => {
		if (userPhone) {
			setPhone(applyPhoneMask(userPhone))
		}
	}, [userPhone])

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(applyPhoneMask(e.target.value))
	}

	const handleSubmit = async (isCallback: boolean) => {
		if (!message.trim()) return;
		try {
			await sendMessage({
				message,
				is_callback_requested: isCallback,
				phone_num: phone
			}).unwrap()
			setMessage('')
            setOpenSnack(true)
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
			<Box sx={{ position: 'relative', overflow: 'hidden', minHeight: '60vh', backgroundColor: '#F5F2F5', borderRadius: 3, p: 3 }}>
				{/* Фон планета */}
				<Box
					sx={{
						position: 'absolute',
						right: 0,
						top: '50%',
						transform: 'translateY(-50%)',
						display: 'flex',
						gap: '15px',
						opacity: 0.15,
						pointerEvents: 'none'
					}}
				>
					<Box component="img" src={leftPlanetPng} sx={{ height: { xs: '200px', md: '500px' }, objectFit: 'contain' }} />
					<Box component="img" src={rightPlanetPng} sx={{ height: { xs: '200px', md: '500px' }, objectFit: 'contain' }} />
				</Box>
				
				<Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4, gap: 3, position: 'relative', zIndex: 1 }}>
					<Box component="img" src={planetSvg} sx={{ width: { xs: '60px', md: '100px' }, objectFit: 'contain' }} />
					<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexGrow: 1 }}>
						<Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '2rem', md: '36px' } }}>
							ПОДДЕРЖКА
						</Typography>
						<Typography sx={{ maxWidth: '500px', fontSize: '18px', mb: 4 }}>
							Пожалуйста, опишите вашу проблему, мы разберемся в ситуации и найдем способ ее решения
						</Typography>
						
						<Box sx={{ maxWidth: '600px', position: 'relative', zIndex: 1 }}>
                <TextField
					fullWidth
					variant="outlined"
					placeholder="Номер телефона"
					value={phone}
					onChange={handlePhoneChange}
					sx={{ 
						mb: 3, 
						backgroundColor: 'white',
						borderRadius: 2,
						'& .MuiOutlinedInput-root': {
							borderRadius: 2,
							'& fieldset': { borderColor: 'rgba(131, 37, 144, 1)' },
							'&:hover fieldset': { borderColor: 'rgba(131, 37, 144, 1)' },
						}
					}}
				/>

				<TextField
					fullWidth
					multiline
					rows={8}
					variant="outlined"
					placeholder="Опишите вашу проблему..."
					value={message}
					onChange={e => setMessage(e.target.value)}
					sx={{ 
						mb: 3, 
						backgroundColor: 'white',
						borderRadius: 2,
						'& .MuiOutlinedInput-root': {
							borderRadius: 2,
							'& fieldset': { borderColor: 'rgba(131, 37, 144, 1)' },
							'&:hover fieldset': { borderColor: 'rgba(131, 37, 144, 1)' },
						}
					}}
				/>
				<Box sx={{ display: 'flex', gap: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
					<Button 
						variant="contained" 
						onClick={() => handleSubmit(false)}
						disabled={!message.trim()}
						sx={{ 
							flex: '1 1 auto',
							borderRadius: '25px', 
							px: 4, 
							py: 1.5,
							backgroundColor: 'rgba(131, 37, 144, 1)',
							textTransform: 'uppercase',
							'&:hover': { backgroundColor: '#5c1966' }
						}}
					>
						Отправить
					</Button>
					<Button 
						variant="contained" 
						onClick={() => handleSubmit(true)}
						disabled={!message.trim()}
						sx={{ 
							flex: '2 1 auto',
							borderRadius: '25px', 
							px: 4, 
							py: 1.5,
							backgroundColor: '#ECD8EF',
							color: 'rgba(131, 37, 144, 1)',
							textTransform: 'uppercase',
							boxShadow: 'none',
							'&:hover': { backgroundColor: '#dcc0e0', boxShadow: 'none' }
						}}
					>
						Запросить обратный звонок
					</Button>
				</Box>
			</Box>
					</Box>
				</Box>
			</Box>

			<Box sx={{ backgroundColor: '#F5F2F5', borderRadius: 3, p: 3 }}>
				<Footer />
			</Box>

            <Snackbar
                open={openSnack}
                autoHideDuration={4000}
                onClose={() => setOpenSnack(false)}
            >
                <Alert onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Ваше обращение успешно отправлено!
                </Alert>
            </Snackbar>
		</Box>
	)
}

export default SupportPage
