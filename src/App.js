import { useEffect, useState } from 'react';
import './App.css';
import data from './data'
function App() {
  const [totalPage, setTotalPage] = useState(null)
  const [listData, setListData] = useState([])
  const [active, setActive] = useState(1);
  useEffect(() => {
    //get tổng số trang
    setTotalPage(Math.ceil(data.length / 3)); // mỗi trang hiển thị 3 phần tử
    //lấy 3 phần tử đầu tiên
    renderData(getListData(1))
  }, []);

  const getListData = (value) => {
    let vitri = (value * 3) - 3;

    const arr = [];
    data.map((item, index) => {
      if(index >= vitri && index <= vitri + 2) {
        arr.push(item)
      }
    })
    return arr;
  }

  const handleChonTrang = (position) => {
    renderData(getListData(position))
    setActive(position)
  }
  
  const renderData = (listData, check = false) => {
    const newArr = listData.map(item => {
      return { ...item, check}
    })
    console.log(newArr);
    setListData(newArr)
  }

  const handleCheckAll = (event) => {
    if (event.target.checked) {
      renderData(listData, true)
    } else {
      renderData(listData)
    }
  }

  return (
    <>
      <p>Check all <input type={'checkbox'} onClick={(e) => handleCheckAll(e)}/></p>
      <table>
        <thead>
          <tr>
            <th>Check</th>
            <th>Company</th>
          </tr>          
        </thead>
        <tbody>
          {listData.length > 0 &&
              listData.map((item, index) => {
                return(
                  <tr key={index}>
                    <td><input checked={item.check ? 'checked' : ''} type={'checkbox'}/></td>
                    <td>{item.name}</td>
                  </tr>                  
                )
              })
          }
        </tbody>

      </table>  
      <div className="pagination">
        <a href="#">&laquo;</a>
        {[...Array(totalPage)].map((x, i) =>
          <a className={i + 1 === active ? 'active' : ''} onClick={() => handleChonTrang(i + 1)} key={i}>{i + 1}</a>
        )}
        <a href="#">&raquo;</a>
      </div>  
    </>

  );
}

export default App;
