from tkinter import *
from tkinter.ttk import *

master = Tk()
master.geometry("200x200")

def openNewWindow():
    newWindow = Toplevel(master)
    newWindow.title("New window Testing...")

    newWindow.geometry("200x200")

    Label(newWindow, text= "This is the new window").pack()

label = Label(master, text="This is the main window")
label.pack(pady = 10)

btn = Button(master, text="click to open a new window", command=openNewWindow)
btn.pack(pady = 10)

mainloop()