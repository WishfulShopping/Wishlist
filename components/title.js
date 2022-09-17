
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import React from 'react'
import { useRouter } from 'next/router'
import { Link } from '@mui/material';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";
import { getBookmarkletUrl, getDeleteUrl, getReadOnlyUrl, isReadWriteUrl } from '../lib/url';

export default function Title({history}) {

  const [bookmarklet, setBookmarklet] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [name, setName] = React.useState("");
  const router = useRouter();
  const shareTitle = "My new Wishlist";
  const shareMessage = "Wishlist";
  const shareIconSize = 32;
  const [shareUrl, setShareUrl] = React.useState("");

  React.useEffect(() => {
    setName(history.getNameSavedInHistory());
    setShareUrl(getReadOnlyUrl())
  }, [router]);

  React.useEffect(() => {
    if (history.getNameSavedInHistory() && name.length>0)
      setName(history.getNameSavedInHistory())
  }, [history]);

  React.useEffect(() => {
    /* generate bookmarklet */
    fetch('../bookmarklet.js').then(response => response.text()).then((text)=>setBookmarklet(`javascript:${text};sendToMetascraper('${getBookmarkletUrl()}');`));
  }, [router]);


  return (<>
    {isReadWriteUrl() && <Container>
      Drag and drop the following link to your bookmarks
            {bookmarklet && (<Link sx={{color:"tertiary.main"}} href={bookmarklet}>🎁 Add {(name && !edit) && (`to ${name}`)}</Link>)}
            {edit && (<>to <form className="form-inline" action="" onSubmit={(e)=>{e.preventDefault();const newName = ((new FormData(e.target)).get("formula")); setName(newName); history.addTraceInHistory(newName); setEdit(false); return false;}}><div className="form-group"><input className="form-control" name="formula" type="text" value={name} onChange={e=>setName(e.target.value)}/></div><span className="badge text-success" onClick={()=>{setEdit(false);}}>✓</span></form></>)}
            {!edit && (<span className="badge" onClick={()=>setEdit(true)}>✏</span>)}
      </Container>}
          <FacebookShareButton
            quote={shareMessage}
            url={shareUrl}
            title={shareTitle}
          >
            <FacebookIcon
              size={shareIconSize}
            />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareUrl}
            title={shareTitle}
          >
            <TwitterIcon
              size={shareIconSize}
            />
          </TwitterShareButton>
          <WhatsappShareButton
            url={shareUrl}
            title={shareTitle}
            separator=": "
          >
            <WhatsappIcon size={shareIconSize} />
          </WhatsappShareButton>
          <EmailShareButton url={shareUrl}
            subject={shareTitle} >
          <EmailIcon 
          size={shareIconSize} />
            </EmailShareButton>
            <div>&nbsp;</div>
            {isReadWriteUrl() && <Button onClick={()=>confirm("Delete ?") && fetch(getDeleteUrl()).then(history.cleanHistory())}>🗑</Button>}
      
  </>);
}
