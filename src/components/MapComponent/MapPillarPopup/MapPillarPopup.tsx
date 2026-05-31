import { Box, Typography, Button, IconButton, Divider } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CloseIcon from '@mui/icons-material/Close'
import { IPillar, IConnectionLink, IPillarLink } from '../../../interfaces/mapInterfaces'

interface Props {
    pillar: IPillar
    pillarLinks: IPillarLink[]
    connectionLinks: IConnectionLink[]
    onClose: () => void
}

const MapPillarPopup = ({ pillar, pillarLinks, connectionLinks, onClose }: Props) => {
    const address = `УЛ. ${pillar.street.toUpperCase()} ${pillar.building}${pillar.index ? pillar.index : ''}`
    
    // Подсчет соединений (максимально приближенный к реальности на основе связей)
    const relatedPillarLinks = pillarLinks.filter(pl => pl.pole_a.id === pillar.id || pl.pole_b.id === pillar.id)
    const activeConnections = connectionLinks.filter(cl => relatedPillarLinks.some(pl => pl.id === cl.pole_link))
    const currentConns = activeConnections.length

    const handleCopy = () => {
        navigator.clipboard.writeText(`${pillar.longitude},${pillar.latitude}`)
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: { xs: '100%', sm: '380px' },
                backgroundColor: 'white',
                borderTopLeftRadius: '20px',
                borderBottomLeftRadius: '20px',
                p: { xs: 3, sm: 4 },
                zIndex: 10,
                boxShadow: '4px 0 15px rgba(0,0,0,0.1)',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box'
            }}
        >
            <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
                <CloseIcon />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <LocationOnIcon sx={{ color: 'rgba(131, 37, 144, 1)', fontSize: 40, mr: 1 }} />
                <Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem', textTransform: 'uppercase' }}>
                        {address}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ color: 'gray', fontSize: '0.9rem' }}>
                            {pillar.longitude},{pillar.latitude}
                        </Typography>
                        <IconButton size="small" onClick={handleCopy} sx={{ ml: 0.5 }}>
                            <ContentCopyIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>КОЛИЧЕСТВО ПОДКЛЮЧЕНИЙ:</Typography>
                <Typography sx={{ color: 'gray', fontSize: '0.85rem' }}>{currentConns} из {pillar.max_connections}</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '0.85rem', pr: 2 }}>КОЛИЧЕСТВО ОФИЦИАЛЬНЫХ ПОДКЛЮЧЕНИЙ:</Typography>
                <Typography sx={{ color: 'gray', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{currentConns} из {pillar.max_connections}</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>СЕТЕВЫЕ ПРОВАЙДЕРЫ:</Typography>
                <Typography sx={{ color: 'gray', fontSize: '0.85rem', textAlign: 'right', maxWidth: '50%' }}>
                    {pillar.owner.name.toUpperCase()}
                </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>СОСТОЯНИЕ:</Typography>
                <Typography sx={{ color: 'gray', fontSize: '0.85rem' }}>Удовлетворительное</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>МАТЕРИАЛ:</Typography>
                <Typography sx={{ color: 'gray', fontSize: '0.85rem' }}>Дерево</Typography>
            </Box>

            <Box sx={{ mt: 'auto', pt: 2, position: 'sticky', bottom: 0, backgroundColor: 'white', zIndex: 5, pb: 1 }}>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        borderRadius: '25px',
                        py: 1.5,
                        backgroundColor: 'rgba(131, 37, 144, 1)',
                        fontWeight: 'bold',
                        '&:hover': { backgroundColor: '#5c1966' }
                    }}
                >
                    РЕДАКТИРОВАТЬ
                </Button>
            </Box>
        </Box>
    )
}

export default MapPillarPopup
