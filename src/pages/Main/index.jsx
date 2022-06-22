import React from 'react';
import useCards from "../../hooks/useCards";
import MainBlock from "./Main";
import cls from "./main.module.scss";
import Loader from "../Favorites/Loader/Loader";
import Sort from "../../components/Sort";
import Slider from "../../components/Slider/Slider";
import {sliderList} from "../../utils/List";
import {listPlaceholder} from "../../utils/Main";

const Main = () => {
  const [productBase, setProductBase] = React.useState(null)
  const [data, setData] = React.useState(null)
  const [dataMain , setDataMain] = React.useState(null)
  const {actions} = useCards()

  React.useEffect(() => {
    actions.getAll().then(r => {
      const base = Object.entries(r.data).map(([id, item]) => {
        return {
          id,
          ...item
        }
      })
      setProductBase(base)
      setData(base)
    })
  }, [])

  if (!productBase) return <div className={cls.loading}><Loader/></div>

  return (
    <>
      <Slider list={sliderList} />
      <Sort
        listPlaceholder={listPlaceholder}
        productBase={productBase}
        setProductBase={setProductBase}
        data={data}
        setData={setData}
        dataMain={dataMain}
        setDataMain={setDataMain}
      />
      {dataMain && <MainBlock dataMain={dataMain} setDataMain={setDataMain}/>}
    </>
  );
};

export default Main;