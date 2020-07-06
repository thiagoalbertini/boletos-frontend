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
         const name = boleto;
         const desc = descricao;
         api.post('/boleto', { boleto: name, descricao: desc, concluido: false }).then((response) => {
            setboleto('');
            SetDescricao('');
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
            <TableCell align="left">Titulo</TableCell>
            <TableCell align="left">Descricacao</TableCell>
            <TableCell align="left">Concluido</TableCell>
            <TableCell align="left"> </TableCell>
          </TableRow>
        </TableHead>
                {lista.map(item => (
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.boleto}</TableCell>
                        <TableCell>{item.descricao}</TableCell>
                        <TableCell>
                            <input type="checkbox" checked={item.concluido} onChange={() => markAsDone(item.id)}/>
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
                    Digite qual problema esta ocorrendo.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="boleto"
                    type="email"
                    fullWidth
                    value={boleto}
                    onChange={e => setboleto(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="desc"
                    label="Descricao"
                    type="email"
                    fullWidth
                    value={descricao}
                    onChange={e => SetDescricao(e.target.value)}
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