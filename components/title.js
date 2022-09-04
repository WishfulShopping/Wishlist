
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import React from 'react'
import { useRouter } from 'next/router'
import { Link } from '@mui/material';

export default function Title({history}) {

  const [bookmarklet, setBookmarklet] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [name, setName] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    setName(history.getNameSavedInHistory())
  }, [router]);

  React.useEffect(() => {
    if (history.getNameSavedInHistory() && name.length>0)
      setName(history.getNameSavedInHistory())
  }, [history]);

  React.useEffect(() => {
    /* generate bookmarklet */
    fetch('../bookmarklet.js').then(response => response.text()).then((text)=>setBookmarklet(`javascript:${text};sendToMetascraper('${window.location.toString().replace('/list', '/api/url/add')}');`));
  }, [router]);


  return (<>
  <Container>
      Drag and drop the following link to your bookmarks
            {bookmarklet && (<Link sx={{color:"tertiary.main"}} href={bookmarklet}>🎁 Add {(name && !edit) && (`to ${name}`)}</Link>)}
            {edit && (<>to <form className="form-inline" action="" onSubmit={(e)=>{e.preventDefault();const newName = ((new FormData(e.target)).get("formula")); setName(newName); history.addTraceInHistory(newName); setEdit(false); return false;}}><div className="form-group"><input className="form-control" name="formula" type="text" value={name} onChange={e=>setName(e.target.value)}/></div><span className="badge text-success" onClick={()=>{setEdit(false);}}>✓</span></form></>)}
            {!edit && (<span className="badge" onClick={()=>setEdit(true)}>✏</span>)}
      </Container>
  <Button onClick={()=>confirm("Delete ?") && fetch(window.location.toString().replace('/list', '/api/clean')).then(history.cleanHistory())}>🗑</Button>
      
  </>);
}
