import * as React from 'react';

class History {
    storage = {};
    load  = () => {
        this.setStorage(JSON.parse(localStorage.getItem('history')) || {});
    }
    setStorage = (data) => {
        this.storage = data;
    }
    addTraceInHistory = (name) => {
        /* remember wishlist */
        const history = JSON.parse(localStorage.getItem('history')) || {};
        if (!history[window.location.pathname])
            history[window.location.pathname] = name;
        if (history[window.location.pathname] && name.length)
            history[window.location.pathname] = name;
        localStorage.setItem('history', JSON.stringify(history));
        this.update();
    }

    getNameSavedInHistory = () => {
        return this.storage[window.location.pathname];
    }

    getStorage = () => Object.entries(this.storage);
    
    cleanHistory = () => {
        const history = JSON.parse(localStorage.getItem('history')) || {};
        delete history[window.location.pathname]; 
        localStorage.setItem('history', JSON.stringify(history)); 
        this.update();
        window.location.replace("..")
        
    }

}
export function useHistory() {
    const [history, setHistory] = React.useState(new History());
    history.update = function () { 
        const newInstance = new History();
        newInstance.update = history.update;
        newInstance.load();
        setHistory(newInstance);
     };
    React.useEffect(() => {
        history.load();
    }, []);
    return history;
  }