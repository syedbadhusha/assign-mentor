## Create mentor json format

    -

    {
        "name":"Sai Mohan",
        "yearsofexp":8
    }

## Create Student json format

    -

    {
    "name":"Syed Badhusha",
    "course":"MERN Fullstack",
    "mailid":"syedbadhusha21@gmail.com",
    "contactno":"8122569394"
}

## Write API to create Mentor

    - End Point - /creatementor

## Write API to create Student

    - End Point - /createstudent

## Write API to Assign a student to Mentor

    - Select one mentor and Add multiple Student

        - End point and request parameter will be mentor object id - /assingmentor/:mentorobjid

    - A student who has a mentor should not be shown in List

        - End point - /nonassignedstudents

## Write API to Assign or Change Mentor for particular Student

    - Select One Student and Assign one Mentor

        - End point and request parameter will be Student object id - /assingonestudent/:studentobjid

## Write API to show all students for a particular mentor

    - End Point and request parameter will be mentor object id - /studentsundermentor/:mentorid

## Write an API to show the previously assigned mentor for a particular student

    - End point and request parameter will be Student object id - /assignedstudent/:studentid

## To Get all students 

    - End point /students

## To get mentor assigned Students list

    - End point /assignedstudents

## To get all Mentors

    - End Point /mentors