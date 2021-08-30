import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Xác nhận đơn hàng', 'Chờ lấy hàng', 'Đang xử lý đơn hàng',
    'Giao hàng thành công'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Vui lòng xác nhận đơn hàng !';
        case 1:
            return 'Chuyển đơn hàng cho shipper !';
        case 2:
            return 'Xử lý đơn hàng ở kho vận chuyển !';
        case 3:
            return 'Đơn hàng đang giao tới địa chỉ người mua !'
        case 4:
            return 'Chúc bạn mua sắm vui vẻ !'
        default:
            return 'Hủy đơn hàng';
    } 
}
function StepByStep({check,setCheck}) {
    const classes = useStyles();
    let status=Number(localStorage.getItem('statusOrder'));
    const [activeStep, setActiveStep] = React.useState(status);
    const steps = getSteps();
    


   


    // UPDATE STATUS
    useEffect(()=>{
        console.log('STATUS'+activeStep)
        let id = Number(localStorage.getItem("orderId"));
        const url='http://localhost:8080/rest/admin/order/status-order/'
        +id+"?status="+activeStep;
        // console.log(url)
        axios({
            url:url,
            method:'PUT'
        })
            .then((response)=>{
                
                  
              console.log('SUCCESS STATUS')
            })
            .catch((error)=>{
                console.log(error);
            });
    },[activeStep])
    

    const handleNext = () => {
        const confirm=window.confirm("Bạn muốn cập nhật đơn hàng này không ?");
        if(confirm===true){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setCheck((prevActiveStep) => prevActiveStep + 1);
        }
       
        
    };

    const huyDonHang=()=>{
        const confirm=window.confirm("Bạn muốn cập nhật đơn hàng này không ?");
        if(confirm===true){
            setActiveStep(5);
            setCheck(5);
        }
    }

    // console.log(check);
   

    return (
        <div className={classes.root}>
            {activeStep!==5?(
                <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}  >
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
                </Stepper>
            ):''}
            
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>Hoàn thành đơn hàng</Typography>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>
                            <b className="fst-italic">{getStepContent(activeStep)}</b></Typography>
                        <div>
                            {
                                activeStep!==5?(
                                    <Button variant="contained" color="primary" onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                ):''
                            }
                           
                            {
                                activeStep===0?(
                                    <Button variant="contained"
                                    onClick={huyDonHang} color="secondary" className="ms-2">
                                        Hủy đơn hàng
                                  </Button>
                                ):''
                            }
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default StepByStep;