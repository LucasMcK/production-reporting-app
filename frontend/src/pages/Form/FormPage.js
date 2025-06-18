import React, { useState } from 'react';
import './FormPage.css';
import '../../index.css';
import InputField from '../../components/InputField/InputField.js';
import Fieldset from '../../components/Fieldset/Fieldset.js';
import Button from '../../components/Button/Button.js';
import Workbook from '../../components/WorkbookInput/WorkbookInput.js';
import WellInput from '../../components/WellInput/WellInput.js';

function ProductionFormPage() {
    const [hoursOn, setHoursOn] = useState('');
    const hoursDown = hoursOn !== '' ? 24 - Number(hoursOn) : '';
    const [reason, setReason] = useState('');

    const [bsw, setBsw] = useState('');
    const [sandPercent, setSandPercent] = useState('');

    const [oil, setOil] = useState('');
    const [water, setWater] = useState('');
    const [sand, setSand] = useState('');
    const initialTankGauge = [oil, water, sand].every((v) => v !== '')
        ? Number(oil) + Number(water) + Number(sand)
        : '';

    const [prodM3, setProdM3] = useState('');
    const netOil = prodM3 && bsw && hoursOn !== '' ? prodM3 * (1 - bsw) : '';
    const netSand =
        prodM3 && sandPercent && hoursOn !== '' ? prodM3 * sandPercent : '';
    const netWater =
        prodM3 && bsw && sandPercent && hoursOn !== ''
            ? prodM3 * (bsw - sandPercent)
            : '';

    const [grossVol, setGrossVol] = useState('');
    const [shipmentBsw, setShipmentBsw] = useState('');
    const shipmentOil =
        grossVol && shipmentBsw && hoursOn !== ''
            ? grossVol * (1 - shipmentBsw)
            : '';
    const shipmentWater =
        grossVol && shipmentBsw && hoursOn !== '' ? grossVol * shipmentBsw : '';

    const [waterLoads, setWaterLoads] = useState('');
    const [shipmentSand, setShipmentSand] = useState('');

    const [ticketNumber, setTicketNumber] = useState('');

    const [fluidOut, setFluidOut] = useState('');
    const [fluidIn, setFluidIn] = useState('');
    const [foamLoss, setFoamLoss] = useState('');

    const [tbg, setTbg] = useState('');
    const [csg, setCsg] = useState('');

    const [propane, setPropane] = useState('');
    const [tankTemp1, setTankTemp1] = useState('');
    const [fluidLevel, setFluidLevel] = useState('');
    const [rpm, setRpm] = useState('');
    const efficiency =
        prodM3 && netOil && rpm ? prodM3 / (netOil * (rpm / 100)) : '';
    const [psiHyd, setPsiHyd] = useState('');

    const [comments, setComments] = useState('');
    const [initials, setInitials] = useState('');

    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [location, setLocation] = useState('');

    const handleYearChange = (val) => setYear(val);
    const handleMonthChange = (val) => setMonth(val);
    const handleLocationChange = (val) => setLocation(val);

    const [quadrantLSD, setQuadrantLSD] = useState('');
    const [section, setSection] = useState('');
    const [township, setTownship] = useState('');
    const [range, setRange] = useState('');
    const [meridian, setMeridian] = useState('');

    const handleQuadrantLSDChange = (val) => setQuadrantLSD(val);
    const handleSectionChange = (val) => setSection(val);
    const handleTownshipChange = (val) => setTownship(val);
    const handleRangeChange = (val) => setRange(val);
    const handleMeridianChange = (val) => setMeridian(val);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            hoursOn,
            hoursDown,
            reason,
            bsw,
            sandPercent,
            oil,
            water,
            sand,
            initialTankGauge,
            prodM3,
            netOil,
            netSand,
            netWater,
            grossVol,
            shipmentBsw,
            shipmentOil,
            shipmentWater,
            waterLoads,
            shipmentSand,
            ticketNumber,
            fluidOut,
            fluidIn,
            foamLoss,
            tbg,
            csg,
            propane,
            tankTemp1,
            fluidLevel,
            rpm,
            efficiency,
            psiHyd,
            comments,
            initials,
        });
    };

    return (
        <div className="container" style={{ width: '1000px' }}>
            <h1>Production Form</h1>
            <form onSubmit={handleSubmit}>
                <Fieldset title="PROPERTY & WELL INFORMATION">
                    <Workbook
                        yearValue={year}
                        onYearChange={handleYearChange}
                        monthValue={month}
                        onMonthChange={handleMonthChange}
                        searchValue={location}
                        onLocationChange={handleLocationChange}
                    />
                    <WellInput
                        quadrantLSDValue={quadrantLSD}
                        onQuadrantLSDChange={handleQuadrantLSDChange}
                        sectionValue={section}
                        onSectionChange={handleSectionChange}
                        townshipValue={township}
                        onTownshipChange={handleTownshipChange}
                        rangeValue={range}
                        onRangeChange={handleRangeChange}
                        meridianValue={meridian}
                        onMeridianChange={handleMeridianChange}
                    />
                </Fieldset>

                <Fieldset title="OPERATIONAL HOURS">
                    <InputField
                        label="Hours On (0-24)"
                        type="number"
                        value={hoursOn}
                        onChange={(e) =>
                            setHoursOn(
                                Math.min(24, Math.max(0, e.target.value))
                            )
                        }
                    />
                    <InputField
                        label="Hours Down"
                        type="number"
                        value={hoursDown}
                        disabled
                    />
                    <InputField
                        label="Reason for Downtime"
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        disabled={hoursDown <= 0}
                    />
                </Fieldset>

                <Fieldset title="FLUID QUALITY METRICS">
                    <InputField
                        label="Total BS&W (%)"
                        type="number"
                        value={bsw}
                        onChange={(e) => setBsw(parseFloat(e.target.value))}
                        step="0.01"
                    />
                    <InputField
                        label="Sand %"
                        type="number"
                        value={sandPercent}
                        onChange={(e) =>
                            setSandPercent(parseFloat(e.target.value))
                        }
                        step="0.01"
                    />
                </Fieldset>

                <Fieldset title="TANK GAUGE">
                    <InputField
                        label="Oil"
                        value={oil}
                        onChange={(e) => setOil(e.target.value)}
                    />
                    <InputField
                        label="Water"
                        value={water}
                        onChange={(e) => setWater(e.target.value)}
                    />
                    <InputField
                        label="Sand"
                        value={sand}
                        onChange={(e) => setSand(e.target.value)}
                    />
                    <InputField
                        label="Initial Tank Gauge"
                        value={initialTankGauge}
                        disabled
                    />
                </Fieldset>

                <Fieldset title="PRODUCTION VOLUMES">
                    <InputField
                        label="Prod m3"
                        value={prodM3}
                        onChange={(e) => setProdM3(parseFloat(e.target.value))}
                    />
                    <InputField
                        label="Net Oil m3"
                        value={netOil || ''}
                        disabled
                    />
                    <InputField
                        label="Net Sand m3"
                        value={netSand || ''}
                        disabled
                    />
                    <InputField
                        label="Net Water m3"
                        value={netWater || ''}
                        disabled
                    />
                </Fieldset>

                <Fieldset title="SHIPMENTS">
                    <InputField
                        label="Gross Vol"
                        value={grossVol}
                        onChange={(e) =>
                            setGrossVol(parseFloat(e.target.value))
                        }
                    />
                    <InputField
                        label="BS&W"
                        value={shipmentBsw}
                        onChange={(e) =>
                            setShipmentBsw(parseFloat(e.target.value))
                        }
                    />
                    <InputField
                        label="Oil m3"
                        value={shipmentOil || ''}
                        disabled
                    />
                    <InputField
                        label="Water m3"
                        value={shipmentWater || ''}
                        disabled
                    />
                    <InputField
                        label="Water Loads"
                        value={waterLoads}
                        onChange={(e) => setWaterLoads(e.target.value)}
                    />
                    <InputField
                        label="Sand m3"
                        value={shipmentSand}
                        onChange={(e) => setShipmentSand(e.target.value)}
                    />
                </Fieldset>

                <Fieldset title="TICKET NUMBER">
                    <InputField
                        label="Ticket Number"
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}
                    />
                </Fieldset>

                <Fieldset title="FLUID">
                    <InputField
                        label="Fluid Out m3"
                        value={fluidOut}
                        onChange={(e) => setFluidOut(e.target.value)}
                    />
                    <InputField
                        label="Fluid In m3"
                        value={fluidIn}
                        onChange={(e) => setFluidIn(e.target.value)}
                    />
                    <InputField
                        label="Foam Loss"
                        value={foamLoss}
                        onChange={(e) => setFoamLoss(e.target.value)}
                    />
                </Fieldset>

                <Fieldset title="PRESSURE">
                    <InputField
                        label="Tbg kPa"
                        value={tbg}
                        onChange={(e) => setTbg(e.target.value)}
                    />
                    <InputField
                        label="Csg kPa"
                        value={csg}
                        onChange={(e) => setCsg(e.target.value)}
                    />
                </Fieldset>

                <Fieldset title="TANK & EQUIPMENT READINGS">
                    <InputField
                        label="Propane %full"
                        value={propane}
                        onChange={(e) => setPropane(e.target.value)}
                    />
                    <InputField
                        label="Tank Temp #1"
                        value={tankTemp1}
                        onChange={(e) => setTankTemp1(e.target.value)}
                    />
                    <InputField
                        label="Fluid Level JTF"
                        value={fluidLevel}
                        onChange={(e) => setFluidLevel(e.target.value)}
                    />
                    <InputField
                        label="Pump RPM"
                        value={rpm}
                        onChange={(e) => setRpm(e.target.value)}
                    />
                    <InputField
                        label="Efficiency"
                        value={efficiency || ''}
                        disabled
                    />
                    <InputField
                        label="psi Hyd"
                        value={psiHyd}
                        onChange={(e) => setPsiHyd(e.target.value)}
                    />
                </Fieldset>

                <Fieldset title="CLOSING SECTION">
                    <textarea
                        placeholder="Comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                    <InputField
                        label="Operators Initials"
                        value={initials}
                        maxLength={2}
                        onChange={(e) =>
                            setInitials(e.target.value.toUpperCase())
                        }
                    />
                </Fieldset>

                <Button type="primary">Submit</Button>
            </form>
        </div>
    );
}

export default ProductionFormPage;
