import React from 'react';

const Location = () => {
    return (
        <section className="location">
            <div className="container my-5">
                <div className="card">
                    <div className="row g-0">
                        <div className="col-md-6">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13596.262283503842!2d-68.5319931!3d-31.5772497!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96813fa948c80cbb%3A0x7035cf3888b11d1c!2sMolinAutos!5e0!3m2!1ses!2sar!4v1727731262532!5m2!1ses!2sar" width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" title="Ubicación de MolinAutos"></iframe>
                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <h2 className="card-title">Contáctanos</h2>
                                <form className="formulario">
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="nombre" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="correo" className="form-label">Correo electrónico</label>
                                        <input type="email" className="form-control" id="correo" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="telefono" className="label">Teléfono</label>
                                        <input type="tel" className="form-control" id="telefono" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="consulta" className="form-label">Consulta</label>
                                        <textarea className="form-control" id="consulta" rows="1" required></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-light">Enviar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;
