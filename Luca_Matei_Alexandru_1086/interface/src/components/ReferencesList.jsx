const ReferencesList = ({ references, handleDelete, handleEdit, all }) => {
    return (
      <div className="reference-list">
          <h1>Referinte</h1>
        {references.map((reference) => (
          <div className="preview" key={reference.id}>
            <div className="textHolder">
            <h2>Titlu: {reference.titlu}</h2>
            <p>Id: {reference.id}</p>
            <p>Articol: {reference.ArticleId}</p>
              <p>Autori: {reference.autori}</p>
              <p>Data: {reference.createdAt}</p>
              
            </div>
            {!all && (
              <div className="buttonHolder">
                <button
                  className="btn"
                  onClick={() => handleDelete(reference.id)}
                >
                  Sterge Referinta
                </button>
                <button
                  className="btn"
                  onClick={() => handleEdit(reference.id)}
                >
                  Modifica Referinta
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default ReferencesList;
  