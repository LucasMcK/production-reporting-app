import React, { useState, useEffect } from 'react';
import './FormPage.css';
import '../../index.css';
import InputField from '../../components/InputField/InputField.js';
import Fieldset from '../../components/Fieldset/Fieldset.js';
import Button from '../../components/Button/Button.js';
import Workbook from '../../components/WorkbookInput/WorkbookInput.js';
import WellInput from '../../components/WellInput/WellInput.js';

function ProductionFormPage() {
    const [dayOfMonth, setDayOfMonth] = useState('');
    // useEffect(() => {
    // const today = new Date().getDate();
    // setDayOfMonth(today.toString());
    // }, []);

    const handleNumericInput = (e, setter, options = {}) => {
        const raw = e.target.value;
        if (raw === '') {
            setter('');
            return;
        }

        let val = parseFloat(raw);
        if (isNaN(val)) return;

        if (options.min !== undefined) val = Math.max(options.min, val);
        if (options.max !== undefined) val = Math.min(options.max, val);

        setter(val);
    };

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
    const netOil =
        prodM3 && bsw && hoursOn !== ''
            ? Number((prodM3 * (1 - bsw / 100)).toFixed(1))
            : '';
    const netSand =
        prodM3 && sandPercent && hoursOn !== ''
            ? Number(((prodM3 * sandPercent) / 100).toFixed(1))
            : '';
    const netWater =
        prodM3 && bsw && sandPercent && hoursOn !== ''
            ? Number((prodM3 * (bsw / 100 - sandPercent / 100)).toFixed(1))
            : '';
    const [recycleM3, setRecycleM3] = useState('');

    const [grossVol, setGrossVol] = useState('');
    const [shipmentBsw, setShipmentBsw] = useState('');
    const shipmentOil =
        grossVol && shipmentBsw && hoursOn !== ''
            ? Number((grossVol * (1 - shipmentBsw / 100)).toFixed(1))
            : '';
    const shipmentWater =
        grossVol && shipmentBsw && hoursOn !== ''
            ? Number(((grossVol * shipmentBsw) / 100).toFixed(1))
            : '';

    const [waterLoads, setWaterLoads] = useState('');
    const [shipmentSand, setShipmentSand] = useState('');

    const [ticketNumber, setTicketNumber] = useState('');

    const [fluidOut, setFluidOut] = useState('');
    const [fluidIn, setFluidIn] = useState('');
    const [foamLoss, setFoamLoss] = useState('');

    const tankGauge =
        hoursOn !== ''
            ? Math.round(
                  (Number(initialTankGauge || 0) +
                      Number(prodM3 || 0) -
                      (Number(grossVol || 0) +
                          Number(waterLoads || 0) +
                          Number(shipmentSand || 0) +
                          (Number(fluidOut || 0) - Number(fluidIn || 0)) +
                          Number(foamLoss || 0))) *
                      10
              ) / 10
            : '';

    const [tbg, setTbg] = useState('');
    const [csg, setCsg] = useState('');

    const [propane, setPropane] = useState('');
    const [tankTemp1, setTankTemp1] = useState('');
    const [fluidLevel, setFluidLevel] = useState('');
    const [rpm, setRpm] = useState('');
    const efficiency =
        prodM3 && netOil && rpm
            ? Number((prodM3 / (netOil * (rpm / 100))).toFixed(1))
            : '';
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workbookName = `${year}-${month} ${location}.xlsx`;

        const formData = {
            dayOfMonth,
            hoursOn,
            hoursDown,
            reason,
            bsw,
            sandPercent,
            tankGauge,
            prodM3,
            oil,
            water,
            sand,
            initialTankGauge,
            netOil,
            netSand,
            netWater,
            recycleM3,
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
            year,
            month,
            location,
            quadrantLSD,
            section,
            township,
            range,
            meridian,
        };

        try {
            const res = await fetch('http://localhost:5001/form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workbookName, formData }),
            });

            const result = await res.json();
            if (res.ok) {
                alert(`Workbook "${workbookName}" updated successfully.`);
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Submit failed:', error);
            alert('Failed to submit form.');
        }
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
                    <InputField
                        label="Day of the Month"
                        value={dayOfMonth}
                        onChange={(e) => setDayOfMonth(e.target.value)}
                        width="100px"
                    />
                </Fieldset>

                {parseInt(dayOfMonth, 10) === 1 && (
                    <Fieldset title="INITIAL TANK GAUGE">
                        <InputField
                            label="Oil"
                            value={oil}
                            onChange={(e) => setOil(e.target.value)}
                            width="100px"
                        />
                        <InputField
                            label="Water"
                            value={water}
                            onChange={(e) => setWater(e.target.value)}
                            width="100px"
                        />
                        <InputField
                            label="Sand"
                            value={sand}
                            onChange={(e) => setSand(e.target.value)}
                            width="100px"
                        />
                        <InputField
                            label="Initial Tank Gauge"
                            value={initialTankGauge}
                            disabled
                        />
                    </Fieldset>
                )}

                <Fieldset title="OPERATIONAL HOURS">
                    <InputField
                        className="number-input-field"
                        label="Hours On"
                        type="number"
                        step="any"
                        value={hoursOn}
                        onChange={(e) =>
                            handleNumericInput(e, setHoursOn, {
                                min: 0,
                                max: 24,
                            })
                        }
                        width="100px"
                    />
                    <InputField
                        label="Hours Down"
                        type="number"
                        step="any"
                        value={hoursDown}
                        disabled
                        width="100px"
                    />
                    <div
                        className="form-row"
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <label className="text-area-label">
                            Reason for Downtime
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            disabled={hoursDown <= 0}
                            style={{ height: '34px' }}
                        />
                    </div>
                </Fieldset>

                <Fieldset title="PRODUCTION VOLUMES">
                    <InputField
                        label="Prod"
                        h6="(m³)"
                        type="number"
                        step="any"
                        value={prodM3}
                        onChange={(e) => setProdM3(parseFloat(e.target.value))}
                        width="100px"
                    />
                    <InputField
                        label="Net Oil"
                        h6="(m³)"
                        value={netOil || ''}
                        disabled
                        width="100px"
                    />
                    <InputField
                        label="Net Sand"
                        h6="(m³)"
                        value={netSand || ''}
                        disabled
                        width="100px"
                    />
                    <InputField
                        label="Net Water"
                        h6="(m³)"
                        value={netWater || ''}
                        disabled
                        width="100px"
                    />
                    <InputField
                        label="Recycle"
                        h6="(m³)"
                        type="number"
                        step="any"
                        value={recycleM3}
                        onChange={(e) =>
                            setRecycleM3(parseFloat(e.target.value))
                        }
                        width="100px"
                    />
                </Fieldset>

                <Fieldset title="SHIPMENTS">
                    <InputField
                        label="Gross"
                        h6="(Vol)"
                        type="number"
                        step="any"
                        value={grossVol}
                        onChange={(e) =>
                            setGrossVol(parseFloat(e.target.value))
                        }
                        width="100px"
                    />
                    <InputField
                        label="BS&W"
                        h6="(%)"
                        type="number"
                        step="any"
                        value={shipmentBsw}
                        onChange={(e) =>
                            setShipmentBsw(parseFloat(e.target.value))
                        }
                        width="100px"
                    />
                    <InputField
                        label="Oil"
                        h6="(m³)"
                        value={shipmentOil || ''}
                        disabled
                        width="100px"
                    />
                    <InputField
                        label="Water"
                        h6="(m³)"
                        value={shipmentWater || ''}
                        disabled
                        width="100px"
                    />
                    <InputField
                        label="Water Loads"
                        h6={'\u00A0'}
                        value={waterLoads}
                        onChange={(e) => setWaterLoads(e.target.value)}
                        width="100px"
                    />
                    <InputField
                        label="Sand"
                        h6="(m³)"
                        value={shipmentSand}
                        onChange={(e) => setShipmentSand(e.target.value)}
                        width="100px"
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
                        label="Fluid Out"
                        h6="(m³)"
                        value={fluidOut}
                        onChange={(e) => setFluidOut(e.target.value)}
                        width="100px"
                    />
                    <InputField
                        label="Fluid In"
                        h6="(m³)"
                        value={fluidIn}
                        onChange={(e) => setFluidIn(e.target.value)}
                        width="100px"
                    />
                    <InputField
                        label="Foam Loss"
                        h6="(m³)"
                        value={foamLoss}
                        onChange={(e) => setFoamLoss(e.target.value)}
                        width="100px"
                    />
                </Fieldset>

                <Fieldset title="FLUID QUALITY METRICS">
                    <InputField
                        label="Total BS&W"
                        h6="(%)"
                        type="number"
                        step="any"
                        value={bsw}
                        onChange={(e) => setBsw(parseFloat(e.target.value))}
                        width="100px"
                    />
                    <InputField
                        label="Sand"
                        h6="(%)"
                        type="number"
                        step="any"
                        value={sandPercent}
                        onChange={(e) =>
                            setSandPercent(parseFloat(e.target.value))
                        }
                        width="100px"
                    />
                    <InputField
                        label="Tank Gauge"
                        h6={'\u00A0'}
                        type="number"
                        step="any"
                        value={tankGauge}
                        disabled
                        width="100px"
                    />
                </Fieldset>

                <Fieldset title="PRESSURE">
                    <InputField
                        label="Tbg"
                        h6="(kPa)"
                        value={tbg}
                        onChange={(e) => setTbg(e.target.value)}
                        width="100px"
                    />
                    <InputField
                        label="Csg"
                        h6="(kPa)"
                        value={csg}
                        onChange={(e) => setCsg(e.target.value)}
                        width="100px"
                    />
                </Fieldset>

                <Fieldset title="TANK & EQUIPMENT READINGS">
                    <InputField
                        label="Propane"
                        h6="(% full)"
                        value={propane}
                        onChange={(e) => setPropane(e.target.value)}
                        width="100px"
                    />
                    <InputField
                        label="Tank Temp"
                        h6="#1"
                        value={tankTemp1}
                        onChange={(e) => setTankTemp1(e.target.value)}
                        width="100px"
                    />
                    <InputField
                        label="Fluid Level"
                        h6="(JTF)"
                        value={fluidLevel}
                        onChange={(e) => setFluidLevel(e.target.value)}
                        width="100px"
                    />
                    <InputField
                        label="Pump"
                        h6="(RPM)"
                        value={rpm}
                        onChange={(e) => setRpm(e.target.value)}
                        width="100px"
                    />
                    <InputField
                        label="Efficiency"
                        h6="(%)"
                        value={efficiency || ''}
                        disabled
                        width="100px"
                    />
                    <InputField
                        label="psi"
                        h6="Hyd"
                        value={psiHyd}
                        onChange={(e) => setPsiHyd(e.target.value)}
                        width="100px"
                    />
                </Fieldset>

                <Fieldset title="CLOSING SECTION">
                    <div
                        className="form-row"
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <label className="text-area-label">Comments</label>
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            style={{ height: '34px' }}
                        />
                    </div>

                    <InputField
                        label="Operators Initials"
                        value={initials}
                        maxLength={2}
                        onChange={(e) =>
                            setInitials(e.target.value.toUpperCase())
                        }
                        width="100px"
                    />
                </Fieldset>

                <Button type="primary">Submit</Button>
            </form>
        </div>
    );
}

export default ProductionFormPage;
