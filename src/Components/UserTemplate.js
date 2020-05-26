import React, { useEffect, useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import ReportModal from "./ReportModal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Container } from 'reactstrap'
import NavBar from "./NavBar";
import AppCollapse from "./AppCollapse";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

function UserTemplate({ location }) {
  const user = localStorage.getItem("user");
  const email = localStorage.getItem("email");
  const [report, setReport] = useState([]);
  const [logout, setLogout] = useState(0);
  const [loading, setLoading] = useState(false);
  localStorage.setItem('subCount', 0)
  const logged = localStorage.getItem('logged')
  let con = localStorage.getItem('subCount')
  /*


    Object.values(report).map((ele,i)=>{
                    ele['reportData'].map((data,i)=>{
                        Object.values(data).map((foo,i)=>{
                            console.log(foo)
                        })
                    })
                })

                Object.values(report).map((ele,i)=>{
                    ele['reportData'].map((data,j)=>{
                        Object.values(data).map((foo,k)=>{
                            return(
                                <li>{foo}</li>
                            )
                        })
                    })
                })

                */

  useEffect(() => {
    let _isMounted = false
    setLoading(true);
    axios
      .get("http://localhost:5000/api/report", {
        params: {
          email: email
        }
      })
      .then(res => {
        if(!_isMounted){
          setReport(res.data);
          setLoading(false);
        }
        
        report.map(report => {
          const { reportData } = report;
          console.log(new Date(reportData[0].date).toString());
        });
      });
      return () => _isMounted = true
  },[location]);

  const logoutFunc = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("email");

    setLogout(1);
  };

  return (
    <div className='user-bg'>
     
      <NavBar />
      <Container>
        <br/>
      <Link to='/' style={{
                float: 'right',
                textDecoration:'none',
                color: 'black'
              }} onClick={logoutFunc}>
                Logout
                <FontAwesomeIcon icon={faUserCircle}/>
              </Link>
              <br/>
              <span  style={{
                float: 'right',
               
              }}

              >
              Welcome, {loading && <Skeleton width={50} />}
              {!loading && <span> {user} </span>}
              </span>
              <br/>
              <br/>
      <ReportModal buttonText="Report A Crime" title="Crime Report" />
      <br/>
      <ReportModal buttonText="Report A Fire Incident " title="Fire Report" /><br/>
      <ReportModal
        buttonText="Report A Health Emergency"
        title="Health Report"
      />
      <h3 style={{textAlign:'center', marginTop:'30px'}}>My Reports</h3>
      <hr style={{width: '300px'}}/>
      {loading && (
        <Fragment>
          {Array(10)
            .fill()
            .map((item, i) => {
              return (
                <Fragment>
                  <Skeleton variant="text" width={100} />
                  <Skeleton height={100} variant="text" />
                  <br />
                  <br />
                </Fragment>
              );
            })}
        </Fragment>
      )}

      {!loading &&
        report.map(report => {
          const { reportData } = report;
          return (
            <Fragment>
              {
                <AppCollapse
                  title="Hello"
                  act={reportData[0].actType}
                  desc={reportData[0].desc}
                  department={reportData[0].department}
                  date={new Date(reportData[0].date).toString()}
                />
              }
            </Fragment>
          );
        })}

  
      </Container>
     
    </div>
  );
}

export default UserTemplate;
