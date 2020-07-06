import React, { useState, useEffect } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableRow, 
    TableCell,
    TableHead, 
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    DialogActions} from '@material-ui/core';
import './style.css';

function App() {

    const [ lista, setLista ] = useState([]); 
    const [ open, setOpen ] = useState(false);
    const [ tipo, setTipo ] = useState('');
    const [ valor,SetValor] = useState('');

    function loadData() { 
        api.get('/boleto').then((response) => { 
            const itens = response.data;
            setLista(itens);
        });
    }

    useEffect(() => loadData(), [])

    const openModal = () => setOpen(true);

    const closeModal = () => setOpen(false);

     function addboleto() { 
         const name = tipo;
         const val = valor;
         api.post('/boleto', { tipo: name, val: valor, open: false }).then((response) => {
            setTipo('');
            SetValor('');
            setOpen(false);
            loadData();
        })
     }
     function markAsDone(id) { 
         api.patch(`/boleto/${id}/done`).then((response) => {
             loadData()
         })
     }

     function deleteboleto(id) {
         api.delete(`/boleto/${id}`).then((response) => { 
            loadData()
         })
     }
    

    return (
        <>
        <Header />
        <Container maxWidth="lg" className="container"> 
            <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Tipo</TableCell>
            <TableCell align="left">Valor</TableCell>
            <TableCell align="left">Pago</TableCell>
            <TableCell align="left"> </TableCell>
          </TableRow>
        </TableHead>
                {lista.map(item => (
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.tipo}</TableCell>
                        <TableCell>{item.valor}</TableCell>
                        <TableCell>
                            <input type="checkbox" checked={item.open} onChange={() => markAsDone(item.id)}/>
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" size="small" color="secondary" onClick={() => deleteboleto(item.id)}>Apagar</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>
        </Container>
        <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Novo boleto</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Tipo de boleto
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="tipo"
                    label="Tipo"
                    type="text"
                    fullWidth
                    value={tipo}
                    onChange={e => setTipo(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="desc"
                    label="Valor"
                    type="text"
                    fullWidth
                    value={valor}
                    onChange={e => SetValor(e.target.value)}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    Cancelar
                </Button>
                <Button onClick={addboleto} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}
export default App;