import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import CustomButton from './CustomButton';
import axios from '../../utils/api';
import { 
    TableSkeletonLoader, AttendanceLogModel, 
    Pagination, RecordingsBanner
} from '../../components';

import { 
    AiOutlineEye as ViewIcon, 
    AiOutlineDownload as DownloadIcon,
    AiFillFile as FileIcon,
    AiFillVideoCamera as VideoFileIcon
} from 'react-icons/ai';

const Table = ({ 
    headers, data, showDownloadButton, showDropDown, 
    loading, showCourses, pagination, currentPage, 
    totalItems, itemsPerPage, paginate, stduentName, 
    recordings, updateClasses
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All Tickets');
    const [selectedCourse, setSelectedCourse] = useState('All Courses');
    const [showModal, setShowModal] = useState(false);

    function handleSearch(searchTerm) {
        setSearchTerm(searchTerm);
    }

    function handleDownloadAll() {
        // Handle download all
        console.log('Download all');
    }

    const handleDownload = async (InvoiceId) => {
        // Download the row data
        console.log('Download', InvoiceId);

        try {
            const response = await axios.post('print-single-invoice', { invoice_id: InvoiceId });
            toast.success('Invoice downloaded successfully');
        } catch (error) {
            console.log('Failed to download invoice single', error);
        }
    }

    function handleStatusChange(status) {
        setSelectedStatus(status);
    }

    function handleCourseChange(course) {
        setSelectedCourse(course);
    }

    const handleCancelClass = (classId) => {
        confirmAlert({
            title: 'Cancel Class',
            message: 'Are you sure you want to cancel this class?',
            buttons: [
                {
                    label: 'No, thanks!',
                    onClick: () => {}
                },
                {
                    label: 'Yes, cancel',
                    onClick: () => {
                        axios.post('/student-cancel-class', { class_id: classId })
                            .then(response => {
                                toast.success('Class cancelled successfully');
                                // Update the prop here to trigger the useEffect in the parent component
                                updateClasses(prevState => !prevState);
                            })
                            .catch(error => {
                                // Handle the error here
                                console.error('Error cancelling class:', error);
                            });
                    }
                }
            ]
        });
    }

    const filteredData = data.filter(row => 
        Object.values(row).some(value => 
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) && (selectedStatus === 'All Tickets' || row.status === selectedStatus)
        && (selectedCourse === 'All Courses' || row.course === selectedCourse)
    );

    return (
        <div>
            <SearchAndDownload
                onSearch={handleSearch}
                onDownloadAll={handleDownloadAll}
                onStatusChange={handleStatusChange}
                showDownloadButton={showDownloadButton}
                showDropDown={showDropDown}
                showCourses={showCourses}
                onCourseChange={handleCourseChange}
            />

            {loading ? (
                <TableSkeletonLoader headers={headers} />
            ) : (
                <>
                    <RecordingsBanner recordings={recordings} />
                    
                    <div style={{ overflowX: 'auto' }}>
                        <table className="w-full border-1 shadow-sm">
                            <thead className="bg-gray-200 border-b-1">
                                <tr>
                                    {headers.map((header, index) => (
                                        <th key={index} className="p-2 pl-4 text-sm font-normal 
                                            text-gray-500 uppercase">
                                            {header === 'actionButton' ? '' : header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((row, rowIndex) => (
                                        <tr key={rowIndex} className='border-b border-gray-300'>
                                            {headers.map((header, cellIndex) => (
                                                <td key={cellIndex} className='p-3 px-4'>
                                                    {header === 'status' ? (
                                                        <span className={`py-1 pl-6 pr-3 rounded-full text-xs relative ${
                                                            row[header] === 'Active' || row[header] === 'Paid' || row[header] === 'Closed' || row[header] === 'Scheduled' || row[header] === 'Attended' ? 'bg-green-200' :
                                                            row[header] === 'Suspended' ? 'bg-red-200' :
                                                            row[header] === 'Refunded' || row[header] === 'Open' || row[header] === 'Makeup' ? 'bg-blue-200' :
                                                            row[header] === 'Reopen' ? 'bg-purple-200' :
                                                            row[header] === 'Absent' ? 'bg-orange-200' :
                                                            'bg-gray-200'
                                                        }`}>
                                                            <span className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 h-2 w-2 rounded-full ${
                                                                row[header] === 'Active' || row[header] === 'Paid' || row[header] === 'Closed' || row[header] === 'Scheduled' || row[header] === 'Attended' ? 'dot-green' :
                                                                row[header] === 'Suspended' ? 'dot-red' :
                                                                row[header] === 'Refunded' || row[header] === 'Open' || row[header] === 'Makeup' ? 'dot-blue' :
                                                                row[header] === 'Reopen' ? 'dot-purple' :
                                                                row[header] === 'Absent' ? 'dot-orange' :
                                                                'dot-gray'
                                                            }`}></span>
                                                            {row[header]}
                                                        </span>
                                                    ) : header === 'action' ? (
                                                        <CustomButton 
                                                            customClass={"bg-transparent text-green"}
                                                            onClick={() => handleDownload(row.invoice_id)}
                                                        >
                                                            {row[header]}
                                                        </CustomButton>
                                                    ) : header === 'view' ? (
                                                        <Link to={`/customer/help/ticket/${row['ticket no']}`} 
                                                            className="text-green">
                                                            {row[header]}
                                                        </Link>
                                                    ) : header === 'date & time' ? (
                                                        <>
                                                            <span className='font-bold'>{row['date']}</span>
                                                            <br />
                                                            {row['time']}
                                                        </>
                                                    ) : (
                                                        row[header] === 'Join Class' ?
                                                            <Link to={`/student/${stduentName}/class/class-room?classId=${row['class_id']}&studentId=${row['student_id']}&teacherId=${row['teacher_id']}`} 
                                                                className='text-green underline'>
                                                                {row[header]}
                                                            </Link>
                                                        :
                                                        row[header] === 'View Details' ?
                                                            <span className='text-green underline cursor-pointer' onClick={() => setShowModal(true)}>{row[header]}</span>
                                                        :
                                                        row[header] === 'View' ?
                                                            <ViewIcon className='w-4 h-4 text-green underline cursor-pointer' 
                                                                onClick={() => window.location.href = `/student/${stduentName}/view-recording?URL=${row['URL']}`}
                                                            />
                                                        :
                                                        row[header] === 'Cancel Class' ?
                                                            <span className='text-gray-500 cursor-pointer' 
                                                                onClick={() => handleCancelClass(row['class_id'])}>
                                                                {row[header]}
                                                            </span>
                                                        :
                                                        header === 'file' ?
                                                            <div className="flex items-center space-x-2">
                                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-light-green">
                                                                    {row[header].endsWith('.mp4') ? <VideoFileIcon className="w-4 h-4 text-green" /> : <FileIcon className="w-4 h-4 text-green" />}
                                                                </div>
                                                                <div>
                                                                    <div>{ row[header] }</div>
                                                                    <div className="text-sm text-gray-400">
                                                                        { row['size'] }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        : 
                                                        <div className={`${['course','type','assigned','duration'].includes(header) 
                                                            ? 'text-gray-400' : ''}`}>
                                                            {row[header]}
                                                        </div>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={headers.length} className="text-center py-4">
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {pagination && (
                        <Pagination 
                            currentPage={currentPage} 
                            totalItems={totalItems} 
                            itemsPerPage={itemsPerPage} 
                            paginate={paginate} 
                        />
                    )}

                    <AttendanceLogModel isOpen={showModal} onRequestClose={() => setShowModal(false)} />
                </>
            )}
        </div>
    );
}

export default Table;