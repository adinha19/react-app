import { useEffect, useState } from 'react';
import { insert, update, read, remove } from '../services/apiService';


const Course = ({ match, history }) => {

    const [id] = useState(match.params.id);
    const [course, setCourse] = useState({
        _id: '0',
        name: '',
        points: 0
    });
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isPointsEmpty, setIsPointsEmpty] = useState(false);

    useEffect(() => {
        if (id !== '0') {
            read('courses', id, data => {
                if (data) setCourse(data);
            })
        }
    }, [id]);

    function changeHandler(e) {
        if (e.target.value && e.target.name === "name") {
            setIsNameEmpty(false);
        }
        if (e.target.value && e.target.name === "points") {
            setIsPointsEmpty(false);
        }
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        });
    }

    const back = () => {
        history.push('/courses');
    }

    const save = () => {
        if (id === '0') {
            if (!course.name) {
                setIsNameEmpty(true);
                return;
            }
            if (!course.points) {
                setIsPointsEmpty(true);
                return;
            }
            insert('courses', course, data => {
                if (data) return history.push('/courses');
                console.log('There was an error during save data');
            })
        }
        else {
            if (!course.name && !course.points) {
                setIsNameEmpty(true);
                setIsPointsEmpty(true);
                return;
            }
            if (!course.name) {
                setIsNameEmpty(true);
                return;
            }
            if (!course.points) {
                setIsPointsEmpty(true);
                return;
            }
            update('courses', id, course, data => {
                if (data) return history.push('/courses');
                console.log('There was an error during save data');
            });
        }
    }

    const del = () => {
        remove('courses', id, data => {
            history.push('/courses');
        })
    }

    return (
        <div className='container'>
            <h2>Course</h2>
            <form className='input-form'>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='name'>Course Name: </label>
                    <input
                        type='text'
                        name='name'
                        value={course.name}
                        onChange={changeHandler}
                        required />
                    {isNameEmpty && <p className="error">This field is required</p>}
                </div>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='points'>Course points: </label>
                    <input type='text'
                        name='points'
                        value={course.points}
                        onChange={changeHandler}
                        required />
                    {isPointsEmpty && <p className="error">This field is required</p>}
                </div>
                <hr />
                {id !== '0' && (
                    <div className='left'>
                        <button type='button' onClick={del}>DELETE</button>
                    </div>
                )}
                <div className='right'>
                    <button type='button' onClick={back}>BACK</button>
                    &nbsp;&nbsp;
                    <button type='button' onClick={save}>SAVE</button>
                </div>
            </form>
        </div>
    );
}
export default Course;