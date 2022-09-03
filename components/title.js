
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import React from 'react'
import { useRouter } from 'next/router'

export default function Title() {

  const [bookmarklet, setBookmarklet] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [name, setName] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    /* remember wishlist */
    const history = JSON.parse(localStorage.getItem('history')) || {};
    if (!history[window.location.pathname])
      history[window.location.pathname] = name;
    if (history[window.location.pathname] && name.length)
      history[window.location.pathname] = name;
    if (!name.length && history[window.location.pathname].length) {
      setName(history[window.location.pathname])
    }
    localStorage.setItem('history', JSON.stringify(history));

  }, [name, router]);


  React.useEffect(() => {
    /* generate bookmarklet */
    fetch('../bookmarklet.js').then(response => response.text()).then((text)=>setBookmarklet(`javascript:${text};sendToMetascraper('${window.location.toString().replace('/list', '/api/url/add')}');`));
  }, [router]);


  return (<>
  <Container>
      Drag and drop the following link to your bookmarks
            {bookmarklet && (<a className="mx-auto" href={bookmarklet}>🎁 Add {(name && !edit) && (`to ${name}`)}</a>)}
            {edit && (<>to <form className="form-inline" action="" onSubmit={(e)=>{e.preventDefault();setName(((new FormData(e.target)).get("formula"))); setEdit(false); return false;}}><div className="form-group"><input className="form-control" name="formula" type="text" value={name} onChange={e=>setName(e.target.value)}/></div><span className="badge text-success" onClick={()=>{setEdit(false);}}>✓</span></form></>)}
            {!edit && (<span className="badge" onClick={()=>setEdit(true)}>✏</span>)}
      </Container>
  <Button onClick={()=>confirm("Delete ?") && fetch(window.location.toString().replace('/list', '/api/clean')).then(()=>{const history = JSON.parse(localStorage.getItem('history')) || {};delete history[window.location.pathname]; localStorage.setItem('history', JSON.stringify(history)); window.location.replace("..")})}>🗑</Button>
      
  </>);
}
