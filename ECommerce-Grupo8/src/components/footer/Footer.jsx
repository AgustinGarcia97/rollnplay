import {Box, Container, Typography} from "@mui/material";

const sx_footer = {
    layout: {
        backgroundColor:'rgba(0,0,0,0.54)',
        display:'flex',
        height: {xs:"", md:'200px'},
        justifyContent:'center',
        alignItems: 'center',
    },
    content:{
        backgroundColor:'#222121',
        width:'100%',
        height:'60%',
        marginLeft:'10%',
        marginRight:'10%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',

    }
}


const Footer = () => {
    return(
        <footer>
            <Box sx={{...sx_footer.layout}}>
                <Box sx={{...sx_footer.content}}>
                    <Container maxWidth="md">
                            <Typography variant="body1" color="white" sx={{textAlign:'center'}}>
                                © {new Date().getFullYear()} Mi Sitio Web. Todos los derechos reservados.
                            </Typography>
                    </Container>
                </Box>
            </Box>

        </footer>
    )
}

export default Footer;