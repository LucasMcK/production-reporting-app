import React, { useState } from 'react';
import './FormPage.css';

function ProductionFormPage() {
  const [hoursOn, setHoursOn] = useState('');
  const hoursDown = hoursOn !== '' ? 24 - Number(hoursOn) : '';
  const [reason, setReason] = useState('');

  const [bsw, setBsw] = useState('');
  const [sandPercent, setSandPercent] = useState('');

  const [oil, setOil] = useState('');
  const [water, setWater] = useState('');
  const [sand, setSand] = useState('');
  const initialTankGauge = [oil, water, sand].every(v => v !== '') ? Number(oil) + Number(water) + Number(sand) : '';

  const [prodM3, setProdM3] = useState('');
  const netOil = prodM3 && bsw && hoursOn !== '' ? prodM3 * (1 - bsw) : '';
  const netSand = prodM3 && sandPercent && hoursOn !== '' ? prodM3 * sandPercent : '';
  const netWater = prodM3 && bsw && sandPercent && hoursOn !== '' ? prodM3 * (bsw - sandPercent) : '';

  const [grossVol, setGrossVol] = useState('');
  const [shipmentBsw, setShipmentBsw] = useState('');
  const shipmentOil = grossVol && shipmentBsw && hoursOn !== '' ? grossVol * (1 - shipmentBsw) : '';
  const shipmentWater = grossVol && shipmentBsw && hoursOn !== '' ? grossVol * shipmentBsw : '';

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
  const efficiency = prodM3 && netOil && rpm ? prodM3 / (netOil * (rpm / 100)) : '';
  const [psiHyd, setPsiHyd] = useState('');

  const [comments, setComments] = useState('');
  const [initials, setInitials] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // send to backend or generate Excel
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
      initials
    });
  };

  return (
    <div className="form-container">
      <h1>Production Form</h1>
      <form onSubmit={handleSubmit}>

        {/* HOURS SECTION */}
        <fieldset>
          <legend>HOURS SECTION</legend>
          <input type="number" placeholder="Hours On (0-24)" value={hoursOn} onChange={e => setHoursOn(Math.min(24, Math.max(0, e.target.value)))} />
          <input type="number" placeholder="Hours Down" value={hoursDown} disabled />
          <input type="text" placeholder="Reason for Downtime" value={reason} onChange={e => setReason(e.target.value)} disabled={hoursDown <= 0} />
        </fieldset>

        {/* FLUID QUALITY METRICS */}
        <fieldset>
          <legend>FLUID QUALITY METRICS</legend>
          <input type="number" placeholder="Total BS&W (%)" value={bsw} onChange={e => setBsw(parseFloat(e.target.value))} step="0.01" />
          <input type="number" placeholder="Sand %" value={sandPercent} onChange={e => setSandPercent(parseFloat(e.target.value))} step="0.01" />
        </fieldset>

        {/* TANK GAUGE */}
        <fieldset>
          <legend>TANK GAUGE</legend>
          <input placeholder="Oil" value={oil} onChange={e => setOil(e.target.value)} />
          <input placeholder="Water" value={water} onChange={e => setWater(e.target.value)} />
          <input placeholder="Sand" value={sand} onChange={e => setSand(e.target.value)} />
          <input placeholder="Initial Tank Gauge" value={initialTankGauge} disabled />
        </fieldset>

        {/* PRODUCTION VOLUMES */}
        <fieldset>
          <legend>PRODUCTION VOLUMES</legend>
          <input placeholder="Prod m3" value={prodM3} onChange={e => setProdM3(parseFloat(e.target.value))} />
          <input placeholder="Net Oil m3" value={netOil || ''} disabled />
          <input placeholder="Net Sand m3" value={netSand || ''} disabled />
          <input placeholder="Net Water m3" value={netWater || ''} disabled />
        </fieldset>

        {/* SHIPMENTS */}
        <fieldset>
          <legend>SHIPMENTS</legend>
          <input placeholder="Gross Vol" value={grossVol} onChange={e => setGrossVol(parseFloat(e.target.value))} />
          <input placeholder="BS&W" value={shipmentBsw} onChange={e => setShipmentBsw(parseFloat(e.target.value))} />
          <input placeholder="Oil m3" value={shipmentOil || ''} disabled />
          <input placeholder="Water m3" value={shipmentWater || ''} disabled />
          <input placeholder="Water Loads" value={waterLoads} onChange={e => setWaterLoads(e.target.value)} />
          <input placeholder="Sand m3" value={shipmentSand} onChange={e => setShipmentSand(e.target.value)} />
        </fieldset>

        {/* TICKET NUMBER */}
        <fieldset>
          <legend>TICKET NUMBER</legend>
          <input placeholder="Ticket Number" value={ticketNumber} onChange={e => setTicketNumber(e.target.value)} />
        </fieldset>

        {/* FLUID */}
        <fieldset>
          <legend>FLUID</legend>
          <input placeholder="Fluid Out m3" value={fluidOut} onChange={e => setFluidOut(e.target.value)} />
          <input placeholder="Fluid In m3" value={fluidIn} onChange={e => setFluidIn(e.target.value)} />
          <input placeholder="Foam Loss" value={foamLoss} onChange={e => setFoamLoss(e.target.value)} />
        </fieldset>

        {/* PRESSURE */}
        <fieldset>
          <legend>PRESSURE</legend>
          <input placeholder="Tbg kPa" value={tbg} onChange={e => setTbg(e.target.value)} />
          <input placeholder="Csg kPa" value={csg} onChange={e => setCsg(e.target.value)} />
        </fieldset>

        {/* TANK & EQUIPMENT READINGS */}
        <fieldset>
          <legend>TANK & EQUIPMENT READINGS</legend>
          <input placeholder="Propane %full" value={propane} onChange={e => setPropane(e.target.value)} />
          <input placeholder="Tank Temp #1" value={tankTemp1} onChange={e => setTankTemp1(e.target.value)} />
          <input placeholder="Fluid Level JTF" value={fluidLevel} onChange={e => setFluidLevel(e.target.value)} />
          <input placeholder="Pump RPM" value={rpm} onChange={e => setRpm(e.target.value)} />
          <input placeholder="Efficiency" value={efficiency || ''} disabled />
          <input placeholder="psi Hyd" value={psiHyd} onChange={e => setPsiHyd(e.target.value)} />
        </fieldset>

        {/* CLOSING SECTION */}
        <fieldset>
          <legend>CLOSING SECTION</legend>
          <textarea placeholder="Comments" value={comments} onChange={e => setComments(e.target.value)} />
          <input placeholder="Operators Initials" value={initials} maxLength={2} onChange={e => setInitials(e.target.value.toUpperCase())} />
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProductionFormPage;