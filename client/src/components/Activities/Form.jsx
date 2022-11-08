import React, {useEffect , useState} from "react";
import { getName, createActivity } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import s from './Form.module.css'
import { ordAlpha } from "../../Order/order";

const Form = ()=> {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const [dif , setDif] = useState('1');
    const [valor, setValor] = useState('Easy')
    const inputHandler = (e)=> {
        setDif(e.target.value)
        cambioDif(e.target.value)
        setDataHandler(e)
    }
    const cambioDif = (value) => {
        if(value === '1' || value === '2'){
            setValor("Easy")
        }else if(value === '3' || value === '4'){
            setValor("Medium")
        }else if(value === '5'){
            setValor("Hard")
        } else {
          setValor("")
        }
    }

    const [dataForm, setDataForm] = useState({
        name: "",
        difficulty: "-",
        duration: "-",
        season: "-",
        countryID: [],
      });
    const stateReset = () => {
        setDataForm({
          ...dataForm,
          name: "",
          countryID: [],
        });
        setCountryList([])
        setInput("");
      };
      const setDataHandler =  (e) => {
        e.preventDefault();
    
        if(e.target.value !== '-'){
          setDataForm({
          ...dataForm,
          [e.target.name]: e.target.value,
        });}
        console.log(dataForm)
      };

      useEffect(() => {
        dispatch(getName(input));
      }, [input]);
    
      const submitForm = (e) => {
        e.preventDefault();
        var form = true;
    
        if ( dataForm["name"].length < 2) {
          form = false;
        } else if (!dataForm["countryID"].length >= 1) {
          form = false;
        } else if(dataForm.difficulty === '-' || dataForm.duration === '-' || dataForm.season === '-'){
          form = false;
        }
        console.log(dataForm)
        if (form) {
          dispatch(createActivity(dataForm))
          .then((e) => alert(e))    
          .then(() => stateReset())
        } else {
          return alert("Please fill all the fields before creating a new activity");
        }
      };
      const countries = useSelector((state)=> state.countries.slice().sort(ordAlpha));
      const list = [];
      for (let i = 0; i < countries.length; i++) {
        list.push({value: Object.values(countries[i])[1], name: Object.values(countries[i])[1], key: Object.values(countries[i])[0]})
      }

      const [countryList, setCountryList] = useState([])
      const countryHandler = (value)=> {
        if(value !== '-'){
          let valor = value.split(',')
          console.log(valor)
          let yaEsta = countryList.find(c => c.name === valor[0])
        if(!yaEsta){
          setCountryList([
            ...countryList,
            {name: valor[0],
            id: valor[2]}
          ])
          setDataForm({
            ...dataForm,
            countryID: [...dataForm.countryID, valor[2]],
          });
        }}
      }
      const eliminateCountry = (value)=> {
        console.log(value.id)
        setCountryList(countryList => countryList.filter((c)=> c.name !== value.name))
        setDataForm({
          ...dataForm,
          countryID: [...dataForm.countryID.filter((c)=> c!== value.id)]
        })
      }


    return (
        <div >
          <div className={s.form}>
            <form  >
              <div className={s.block}>
                <input
                  className={s.name}
                  value={dataForm.name}
                  type="text"
                  autoComplete="off"
                  placeholder="Name your activity"
                  name="name"
                  onChange={setDataHandler}
                //   value={dataForm.name}
                />
              </div>
    
              <div className={s.blockS}>
                <label className={s.text}>Select difficulty</label>
                <select
                    className={s.input}
                    name="difficulty"
                    // value={dataForm.difficulty}
                    id="difficulty"
                    onChange={(e) =>{ inputHandler(e) }}
                >
                  <option value='-'>Select difficulty...</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
                <label className={s.difficulty}> {valor} </label>
              </div>
    
              <div className={s.block}>
                <label className={s.text}>Duration in hours</label>
                <select
                    className={s.input}
                    name="duration"
                    // value={dataForm.duration}
                    id="duration"
                    onChange={setDataHandler}
                >
                  <option value='-'>Select duration...</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                  <option value={12}>12</option>
                  <option value={13}>13</option>
                  <option value={14}>14</option>
                  <option value={15}>15</option>
                  <option value={16}>16</option>
                  <option value={17}>17</option>
                  <option value={18}>18</option>
                  <option value={19}>19</option>
                  <option value={20}>20</option>
                  <option value={21}>21</option>
                  <option value={22}>22</option>
                  <option value={23}>23</option>
                  <option value={24}>24</option>
                </select>
              </div>
    
              <div className={s.block}>
                <label className={s.text}>Select season</label>
                <select
                    className={s.input}
                  name="season"
                //   value={dataForm.season}
                  id="season"
                  onChange={setDataHandler}
                >
                  <option value="-" >Select season...</option>
                  <option value="Autumn">Autumn</option>
                  <option value="Winter">Winter</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                </select>
              </div>
    
              <div className={s.blockSel} >
                <label className={s.text}>Select Countries</label>
                <select className={s.input} onChange={(e) => countryHandler(e.target.value) }>
                  <option value="-" >Select country...</option>
                  {list.map((c)=> {
                    return <option value={Object.values(c)} >{c.name}</option>
                  })}
                </select>
                <div className={s.lista}>
                    {
                    countryList?.map( (c)=> {
                        const value = c;
                       return <div className={s.elementos}>
                        <h3 className={s.pais}>{c.name}</h3>
                        <div className={s.contBoton}>
                          <button type="button" className={s.boton} onClick={()=>eliminateCountry(value)} >X</button>
                        </div>
                        </div>
                    })
                    }
                </div>
              </div>
              <div className={s.block}>
                <input type="submit" value="Add activity" className={s.input2} onClick={(e) => submitForm(e)} />
              </div>
            </form>
          </div>
          </div>)    
};

export default Form;