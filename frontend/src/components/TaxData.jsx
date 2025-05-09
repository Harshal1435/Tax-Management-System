import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/data/NoteContext';
import ShowAns from './ShowAns';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaxData = () => {
    let history = useNavigate();

    useEffect(() => { //for showing all the notes. which we fetched from mongoDb
        if (localStorage.getItem('adminToken')) {
            history("/");
        }
        else {
            history("/login");
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const closeRef = useRef(null);

    const context = useContext(noteContext);
    const { addNote } = context;

    const [hide, setHidden] = useState(false);


    const [note, setNote] = useState({ bas: "", lta: "", hra: "", fa: "", inv: "", med: "", rent: "" });
    const [areaVal, setAreaVal] = useState("met");
    const [finalTax, setfinalTax] = useState(null);


    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const ModalHandle = () => {
        let finalTax = 0;
        if (areaVal === "met") {
            const n1 = parseInt(note.bas);
            const n2 = parseInt(note.lta);
            const n3 = parseInt(note.hra);
            const n4 = parseInt(note.fa);
            const n6 = parseInt(note.inv);
            const n7 = parseInt(note.med);
            const n8 = parseInt(note.rent);
            const appHra = Math.min(0.5 * n8 - 0.1 * n1, n3);
            const ans = Math.round((n1 + n2 + n3 + n4) - appHra - n6 - n7);
            setfinalTax(ans);
            finalTax = ans;
        }
        else {
            const n1 = parseInt(note.bas);
            const n2 = parseInt(note.lta);
            const n3 = parseInt(note.hra);
            const n4 = parseInt(note.fa);
            const n6 = parseInt(note.inv);
            const n7 = parseInt(note.med);
            const n8 = parseInt(note.rent);
            const appHra = Math.min(0.4 * n8 - 0.1 * n1, n3);
            const ans = Math.round((n1 + n2 + n3 + n4) - appHra - n6 - n7);
            finalTax = ans;
            setfinalTax(ans);
        }
        addNote(note.bas, note.lta, note.hra, note.fa, note.inv, note.med, note.rent, finalTax);
        closeRef.current.click();
        setNote({ bas: "", lta: "", hra: "", fa: "", inv: "", med: "", rent: "" });
        setHidden(true);
    }

    const handleClick = (e) => {
        e.preventDefault();
        ref.current.click();
    }

    return (
        <>
            {!hide ? null : <ShowAns value={finalTax} />}
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirm Values</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">House Rate</label>
                                    <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" name='etitle' value={note.bas} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Water Tax</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.lta} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Electric tax</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.hra} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Land Tax</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.fa} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Buissnes tax</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.inv} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Medical Policy Premium</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.med} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Rent</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.rent} onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={ModalHandle}>Calculate</button>
                        </div>
                    </div>
                </div>
            </div>


            {!hide ? <form className='my-2 taxCol'>
                <div className="form-group">
                    <label htmlFor="bas" className='taxCol-head'>House Rate</label>
                    <input type="number" className="form-control adj-input shadow-none" id="bas" placeholder="Enter House Rate" name="bas" autoComplete='false' onChange={onchange} value={note.bas} />
                </div>
                <div className="form-group">
                    <label htmlFor="lta" className='taxCol-head'>Water Tax</label>
                    <input type="number" className="form-control adj-input shadow-none" id="lta" placeholder="Enter Water Tax" name="lta" autoComplete='false' onChange={onchange} value={note.lta} />
                </div>
                <div className="form-group" >
                    <label htmlFor="hra" className='taxCol-head'>Electric tax</label>
                    <input type="number" className="form-control adj-input shadow-none" id="hra" placeholder="Enter Electric tax" name="hra" autoComplete='false' onChange={onchange} value={note.hra} />
                </div>
                <div className="form-group">
                    <label htmlFor="fa" className='taxCol-head'>Land Tax</label>
                    <input type="number" className="form-control adj-input shadow-none" id="fa" placeholder="Enter Land Tax" name="fa" autoComplete='false' onChange={onchange} value={note.fa} />
                </div>
                <div className="form-group">
                    <label htmlFor="inv" className='taxCol-head'>Buissnes tax</label>
                    <input type="number" className="form-control adj-input shadow-none" id="inv" placeholder="Enter Buissnes tax" name="inv" autoComplete='false' onChange={onchange} value={note.inv} />
                </div>
                <div className="form-group" >
                    <label htmlFor="med" className='taxCol-head'>Medical Policy Premium</label>
                    <input type="number" className="form-control adj-input shadow-none" id="med" placeholder="Enter med" name="med" autoComplete='false' onChange={onchange} value={note.med} />
                </div>
                <div className="form-group">
                    <label htmlFor="rent" className='taxCol-head'>Rent</label>
                    <input type="number" className="form-control adj-input shadow-none" id="rent" placeholder="Enter rent" name="rent" autoComplete='false' onChange={onchange} value={note.rent} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="med" className='taxCol-head'>Area</label>
                    <select name="tempDiff" id="tempDiff" className='mx-2' value={areaVal} onChange={(e) => { setAreaVal(e.target.value) }}>
                        <option value="met">Metro</option>
                        <option value="nomet">Non-Metro</option>
                    </select><br />
                </div>
                <button type="submit" className="btn btn-primary my-2 glow-on-hover" onClick={handleClick} disabled={note.bas === "" || note.lta === "" || note.hra === "" || note.fa === "" || note.rent === "" || note.inv === "" || note.med === ""} >Submit</button>
            </form> : null}
        </>
    )
}

export default TaxData